import json
import pandas as pd
import datetime
import matplotlib.pyplot as plt

items_sale = {}

def sale_creator(data , data_length):
  for i in range(data_length):
    item_code = (str(data.iloc[i][5])).strip()
    item_name = (str(data.iloc[i][6])).strip()
    bill_date = (str(data.iloc[i][0])).strip()
    bill_number = (str(data.iloc[i][1])).strip()
    party_code = (str(data.iloc[i][2])).strip()
    qty = data.iloc[i][8]

# Since data doesnot have date and party code for all we need to assign them ourselves
    if(isinstance(bill_date , str) != True):
      bill_date = str(bill_date)
      bill_date = ""

    if(bill_date == ""):
      c = True
      j = 0
      while c == True:
        j +=1
        if (str(data.iloc[i-j][0])).strip() !="" and (str(data.iloc[i-j][0])).strip() !="nan":
          bill_date = (str(data.iloc[i-j][0])).strip()
          c = False


    if(party_code == ""):
      c = True
      j = 0
      while c == True:
        j += 1
        if (str(data.iloc[i-j][2])).strip() !="":
          party_code = (str(data.iloc[i-j][2])).strip()
          c = False

    # below we are converting the date which is in string into a datetime object
    # so that we can get months and years easily
    bill_date = datetime.datetime.strptime(bill_date , "%d/%m/%Y")
    month = bill_date.strftime("%B")

    if item_code in items_sale:
      # items_sale[]
      if bill_date.year in items_sale[item_code]:

        if month in items_sale[item_code][bill_date.year]:
          items_sale[item_code][bill_date.year][month]["total_sale"] += qty
        else:
          items_sale[item_code][bill_date.year][month] = {
              "total_sale":qty
          }
      else:
        items_sale[item_code][bill_date.year] = {
            month:{
                "total_sale":qty
            }
        }



    else:
      items_sale[item_code] = {
          "item_name":item_name,
          bill_date.year: {
              month:{
                  "total_sale":qty
              }
            }
      }
    
  return items_sale



def data_creator():
  
  data4 = pd.read_excel("data/year2020.xlsx" , sheet_name="Sheet1")
  data5 = pd.read_excel("data/year2021.xlsx" , sheet_name="Sheet1")
  data6 = pd.read_excel("data/year2022.xlsx" , sheet_name="Sheet1")
  data7 = pd.read_excel("data/year2023.xlsx" , sheet_name="Sheet1")

  sale_creator(data4 , data4.shape[0])
  sale_creator(data5 , data5.shape[0])
  sale_creator(data6 , data6.shape[0])
  sale_creator(data7 , data7.shape[0])

  data1 = pd.read_excel("data/year2017.xlsx" , sheet_name="Sheet1")
  data2 = pd.read_excel("data/year2018.xlsx" , sheet_name="Sheet1")
  data3 = pd.read_excel("data/year2019.xlsx" , sheet_name="Sheet1")
  sale_creator(data1 , data1.shape[0])
  sale_creator(data2 , data2.shape[0])
  sale_creator(data3 , data3.shape[0])

  sales = json.dumps(items_sale)

  # with open('data/sales_data_2017_2018_2019.py' , 'w') as file:
  #   file.write("item_sales_togther = " + sales)

  print(items_sale)

  # print("file created successfully")


# data_creator()
print("hello world!")

def data_improver(data):
  keys = list(data.keys())
  months_array = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September","October","November","December"]
  years = ["2020","2021","2022","2023"]
  for key in keys:
    for year in years:
      if(str(year) in data[key]):
        for month in months_array:
          if month not in data[key][str(year)]:
            data[key][str(year)][month] = 0


  return data