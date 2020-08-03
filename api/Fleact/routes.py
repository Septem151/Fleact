from Fleact import app
from flask import jsonify, request, abort
from datetime import datetime
import pytz
import math


timezone_refs = {
    'CST': 'US/Central',
    'EST': 'US/Eastern',
    'MST': 'US/Mountain',
    'PST': 'US/Pacific',
}


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK', 'mode': app.config['ENV']})


@app.route('/api/greeting', methods=['GET'])
def greeting():
    name = request.args.get('name', 'world')
    return jsonify({'greeting': f'Hello {name}!'})


@app.route('/api/time', methods=['GET'])
def time():
    timezone = request.args.get('zone', 'UTC')
    simple = request.args.get('simple', 'false').lower()
    if (timezone not in pytz.common_timezones
            and timezone not in timezone_refs) \
            or simple not in ['true', '1', 'false', '0']:
        abort(404)
    if timezone in timezone_refs:
        cur_time = datetime.now(tz=pytz.timezone(timezone_refs[timezone]))
    else:
        cur_time = datetime.now(tz=pytz.timezone(timezone))
    json_time = {
        'formatted': {
            'number': cur_time.strftime('%m/%d/%y - %I:%M:%S %p %Z'),
            'string': cur_time.strftime('%B %d, %Y - %I:%M:%S %p %Z')
        }
    }
    if simple in ['false', '0']:
        json_time.update({
            'month': cur_time.strftime('%m'),
            'day': cur_time.strftime('%d'),
            'weekday': cur_time.strftime('%A'),
            'year': cur_time.strftime('%Y'),
            'hour': cur_time.strftime('%H'),
            'minute': cur_time.strftime('%M'),
            'second': cur_time.strftime('%S'),
            'timezone': cur_time.strftime('%Z')
        })
    return jsonify(json_time)


@app.route('/api/math', methods=['POST'])
def mathematics():
    operation = request.args.get('op')
    num1 = request.args.get('num1')
    num2 = request.args.get('num2')
    is_hex = request.args.get('hex', 'false').lower()
    if not operation or not num1 or not num2:
        abort(400)
    if is_hex not in ['true', '1', 'false', '0']:
        abort(400)
    result = {}
    try:
        num1 = math.pi if num1.lower() == 'pi' else float(num1)
        num2 = math.pi if num2.lower() == 'pi' else float(num2)
        if operation == 'addition':
            result.update({'result': num1+num2, 'equation': f'{num1} + {num2} = {num1 + num2}'})
        elif operation == 'subtraction':
            result.update({'result': num1-num2, 'equation': f'{num1} - {num2} = {num1-num2}'})
        elif operation == 'multiplication':
            result.update({'result': num1*num2, 'equation': f'{num1} * {num2} = {num1*num2}'})
        elif operation == 'division':
            result.update({'result': num1/num2, 'equation': f'{num1} / {num2} = {num1/num2}'})
        elif operation == 'exponent':
            result.update({'result': num1**num2, 'equation': f'{num1} ^ {num2} = {num1**num2}'})
        else:
            result['error'] = f'Unknown operation: {operation}'
    except (ValueError, OverflowError, TypeError):
        result['error'] = f'Invalid number format error: num1 = "{num1}", num2 = "{num2}'
    except ZeroDivisionError:
        result['error'] = 'Divide by 0 error'
    return jsonify(result)
