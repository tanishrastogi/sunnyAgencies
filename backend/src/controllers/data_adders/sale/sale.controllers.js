import { handleErr } from "../../../utils/apiError.js"
import { spawn } from "child_process"


const sale_data_adder = async (req, res) => {
  try {

    const pythonProcess = spawn("python3", ['../python_files/sale_creator.py']);
    let result = {};
    pythonProcess.stdout.on('data', (data) => {
      result = data.toString();
    })

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      res.status(500).send('Internal Server Error');
    });
  }
  catch (err) {
    return handleErr(res, err)
  }
}

export { sale_data_adder }