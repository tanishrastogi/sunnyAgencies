import json
from flask import Flask , jsonify
from sales_data import item_sale
from sales_data_2017_2018_2019 import item_sales_togther


data = json.dumps(item_sales_togther)
# data = json.dumps(item_sale)

app = Flask(__name__)
@app.route('/py/getData')
def get_data():
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
