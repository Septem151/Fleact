#!/bin/bash
set -e;

function deploy_cluster {
    echo "----- Deploying cluster -----";
    printf "%-20s | %-20s | %-12s | %-15s | %-11s | %-11s\n" \
        "Cluster Name" "Nodegroup Name" "Node Type" "Default # Nodes" "Min # Nodes" "Max # Nodes" \
        "${CLUSTER_NAME}" "${NODEGROUP_NAME}" "${NODE_TYPE}" "${NODE_COUNT}" "${MIN_NODE_COUNT}" "${MAX_NODE_COUNT}";
    echo;
    eksctl create cluster --name ${CLUSTER_NAME} \
        --version 1.17 \
        --region us-east-2 \
        --nodegroup-name ${NODEGROUP_NAME} \
        --node-type ${NODE_TYPE} \
        --nodes ${NODE_COUNT} \
        --nodes-min ${MIN_NODE_COUNT} \
        --nodes-max ${MAX_NODE_COUNT} \
        --managed \
        --asg-access;
    echo;
}

function config_cluster {
    echo "----- Configuring Cluster -----";
    # Metrics Server
    kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.3.7/components.yaml;

    # Cluster Node Autoscaling
    envsubst < templates/node_autoscaler_template.yaml > node_autoscaler.yaml;
    kubectl apply -f node_autoscaler.yaml;

    # Nginx Ingress Controller
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.34.1/deploy/static/provider/aws/deploy.yaml;
    echo;
}

function deploy_app {
    echo "----- Deploying App -----";
    # Configure TLS key and cert for Ingress
    if [[ ! -f ../tls.crt || ! -f ../tls.key ]]; then
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout ../tls.key -out ../tls.crt -subj "/CN=fleact.xyz"
    fi
    export TLS_CRT=$(cat ../tls.crt | base64 -w 0) TLS_KEY=$(cat ../tls.key | base64 -w 0);

    envsubst < templates/kube_up_template.yaml > kube_up.yaml;

    # Wait a few minutes for Ingress Controller to become accessible
    echo "Waiting a few moments for Nginx Ingress Controller availability...";
    sleep 5m;

    kubectl apply -f kube_up.yaml;
}

function print_usage {
    cat <<EOF
Usage: $0 cluster_name namespace nodegroup_name node_type [node_count] [min_node_count] [max_node_count]

cluster_name    [Required] The Cluster's Name
namespace       [Required] Namespace to deploy the app to
nodegroup_name  [Required] The Node Group's Name
node_type       [Required] The EC2 instance type to use in the Node Group
node_count      [Optional] The default number of nodes in the Node Group (default: 4)
min_node_count  [Optional] The minimum number of nodes in the Node Group (default: 4)
max_node_count  [Optional] The maximum number of nodes in the Node Group (default: 6)
EOF
}

# Print usage if # of arguments does not match expected
if [[ $# -ne 4 && $# -ne 7 ]]; then
    print_usage;
    exit 1;
fi

# Export environment variables for file substitution
export CLUSTER_NAME=$1 NAMESPACE=$2 NODEGROUP_NAME=$3 NODE_TYPE=$4 NODE_COUNT="${5:-4}" MIN_NODE_COUNT="${6:-4}" MAX_NODE_COUNT="${7:-6}";

deploy_cluster;
config_cluster;
deploy_app;
