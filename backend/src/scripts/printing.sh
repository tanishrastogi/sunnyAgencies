#!/bin/bash

js_file_name="printingtxt.js"
file_argv="recieving_page"
node "$js_file_name" "$file_argv"

printer_name="CANONLBP2900"

file="recieving_page.pdf"

lp -d "$printer_name" "$file"

if [$? -eq 0]; then 
  echo "File Printed Successfully"
else
  echo "Error printing the file"
fi


