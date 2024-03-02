from openpyxl import Workbook
from openpyxl.drawing.image import Image
from sales_data import item_sale
from bargraph_creator import bar_graph_creator
from sale_creator import data_improver
wb = Workbook()
ws = wb.active

item_code_list = list(item_sale.keys())
years = ["2020" , "2021" , "2022" , "2023"]
item_sales = data_improver(item_sale)
# len(list(item_sales.keys()))
for i in range(2):
    for j,year in enumerate(years):
        bar_graph_creator(item_sale , item_code_list[i] , str(year))
        img = Image(f"graph1.png")
        location = ['A' , 'F' ,'K' ,'P']
        ws.add_image(img , f"{location[j]}{i*10+1}")

wb.save("graphs.xlsx")    

print(item_code_list)