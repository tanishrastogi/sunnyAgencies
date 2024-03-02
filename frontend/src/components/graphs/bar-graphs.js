import React, { useEffect, useState } from "react"
import { BACKEND_URL } from "../../api.config.js"
import { useNavigate } from "react-router-dom"
import "./graphs.css"

const BarGraph = () => {

    const [details, setDetails] = useState({
        itemCode: "",
        year: ""
    })

    const [file_create, setFileCreate] = useState(false)

    const [image, setImage] = useState("");

    const history = useNavigate()

    const addData = (e) => {

        const { name, value, checked } = e.target

        console.log(name, value, checked)

        if (value === 'fileCreate') { setFileCreate(!file_create) }

        setDetails(() => {
            return {
                ...details,
                [name]: value
            }
        })
    }


    const getGraph = async () => {
        const graph = await fetch(`${BACKEND_URL}/api/graphs/bar`, {
            method: "post",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                itemCode: details.itemCode,
                year: details.year,
                file_create: file_create
            })
        })

        if (details.itemCode.length === 0 || details.year.length === 0) {
            alert('Fill all the details');
            return;
        }


        const data = await graph.arrayBuffer()
        // console.log(data['byteLength'])

        if (data['byteLength'] < 300) history('/error/bar-graphs');

        const blob = new Blob([data], { type: 'image/*' })
        const url = URL.createObjectURL(blob)
        setImage(url)

    }



    return <>
        <div className="bar-graph">
            <h3>GRAPH GENERATOR</h3>
            <input name="itemCode" value={details.itemCode} onChange={addData} required placeholder="Enter item code" />
            <input name="year" value={details.year} onChange={addData} required placeholder="Enter year" />

            <button onClick={getGraph}>GENERATE</button>
            {image.length ===0 ?<div className="graph-img">Click on the GENERATE button to generate graph</div>:<img src={image} />}
        </div>
    </>
}

export { BarGraph }