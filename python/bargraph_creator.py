import matplotlib.pyplot as plt
from sales_data import item_sale
from sale_creator import data_improver




def bar_graph_creator(data_name , itemCode , year):
  y_axis = []

  months_array = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September","October","November","December"]
  for month in months_array:
    # if month in data_name[itemCode][year]:
    #   y_axis.append(data_name[itemCode][year][month]["total_sale"])
    # else:
    #   y_axis.append(0)

    if str(year) in data_name[itemCode]:
      if month in data_name[itemCode][str(year)]:
        try:
          y_axis.append(data_name[itemCode][str(year)][month]["total_sale"])
        except KeyError:
          y_axis.append(0) 
        except TypeError:
          y_axis.append(0) 
  
        print(type(itemCode) , type(year) , type(month))
        
      else:
        y_axis.append(0)
    else:
      data_name[itemCode][str(year)] = {
        'January': 0,
        'February': 0,
        'March': 0,
        'April': 0,
        'May': 0,
        'June': 0,
        'July': 0,
        'August': 0,
        'September': 0,
        'October': 0,
        'November': 0,
        'December': 0
        }
    print(len(y_axis))





  if len(months_array) == len(y_axis):
    plt.bar(months_array , y_axis , width=0.5)
    plt.xticks(rotation=45)
    plt.xlabel("Months")
    plt.ylabel("Total Sale")
    plt.title(f"{item_sale[itemCode]['item_name']} sale for year {year}")
    plt.savefig("graph1.png" , dpi=300 , bbox_inches="tight")


bar_graph_creator(item_sale , "BETNSY" , "2023")