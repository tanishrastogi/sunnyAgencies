import React, { useEffect, useState } from 'react'
import "./styles/fetchall.css"
import { fetchAllNotes } from '../../api/paymentNotes.api';
import img from "./image/pcqrnnnni.png"

const FetchAll = () => {

  const [data, setData] = useState([]);

  // const data = [
  //   {
  //     "date": "2024-07-12",
  //     "notes": [
  //       {
  //         "_id": "6690dc0f236539a1502bae13",
  //         "billNumber": "T-001275",
  //         "billDate": "19-05-2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "UP3320B0000471",
  //             "dlNo2": "UP3321B0000471",
  //             "gstNumber": "09IIBPK0052H1ZF",
  //             "mobile": [
  //               "8957774826",
  //               "9795119761",
  //               ""
  //             ]
  //           },
  //           "_id": "667fd0b603ef73de41cf517d",
  //           "partyName": "DEEP MEDICAL & SURGICAL",
  //           "partyCode": "A00624",
  //           "address": [
  //             "MARPURI GATE NEAR IMSS HOSPITA",
  //             "RAEBARELLY",
  //             "MUNSHI GANJ"
  //           ],
  //           "bills": [
  //             "667fd5c0b2f5897f7c563a00",
  //             "667fd5d7b2f5897f7c564831",
  //             "667fd5edb2f5897f7c5657f2"
  //           ],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:15:34.750Z",
  //           "updatedAt": "2024-07-18T20:48:10.738Z",
  //           "__v": 6,
  //           "paymentNotes": [
  //             "6690dc0f236539a1502bae13"
  //           ],
  //           "collections": [
  //             "66997a0a3ebf533f8a883b5a",
  //             "66997a0b3ebf533f8a883bac",
  //             "66997a0e3ebf533f8a883e66",
  //             "66997f7b955e54417a2aaa3d",
  //             "66997f7c955e54417a2aaaa1",
  //             "66997f7f955e54417a2aad79"
  //           ]
  //         },
  //         "narration": "PAYMENT NHI AAYA 15 TK TOH 15-07 KO DUBARA MILANA HAI",
  //         "createdAt": "2024-07-12T07:32:31.000Z",
  //         "updatedAt": "2024-07-12T07:32:31.000Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "669109a49152bcbf0feba119",
  //         "billNumber": "\n",
  //         "billDate": "01/06/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "UP3220b000645",
  //             "dlNo2": "UP3221b000645",
  //             "gstNumber": "09CZVPK4108F1Z2",
  //             "mobile": [
  //               "",
  //               "9415436501",
  //               "7860900786"
  //             ]
  //           },
  //           "_id": "667fd0cf03ef73de41cf6825",
  //           "partyName": "NEW FAROOQUI MEDICAL STORE",
  //           "partyCode": "A00237",
  //           "address": [
  //             "ASHRAF HUSAINI",
  //             "CHAUHAN MARKET RAE BARELI",
  //             "RAE BARELI"
  //           ],
  //           "bills": [
  //             "667fd5bab2f5897f7c56359d",
  //             "667fd5ccb2f5897f7c564146"
  //           ],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:15:59.634Z",
  //           "updatedAt": "2024-07-18T20:48:13.821Z",
  //           "__v": 8,
  //           "paymentNotes": [
  //             "669109a49152bcbf0feba119"
  //           ],
  //           "collections": [
  //             "66997a0d3ebf533f8a883dca",
  //             "66997a0e3ebf533f8a883ef2",
  //             "66997a113ebf533f8a88412a",
  //             "66997a123ebf533f8a884296",
  //             "66997f7e955e54417a2aac77",
  //             "66997f80955e54417a2aaee7",
  //             "66997f82955e54417a2ab051",
  //             "66997f83955e54417a2ab175"
  //           ]
  //         },
  //         "narration": "make them a call on 16/07/2024",
  //         "createdAt": "2024-07-12T10:47:00.754Z",
  //         "updatedAt": "2024-07-12T10:47:00.754Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "66910b1e9152bcbf0feba129",
  //         "billNumber": "",
  //         "billDate": "",
  //         "party": {
  //           "details": {
  //             "dlNo1": "2769/13",
  //             "dlNo2": "2770/13",
  //             "gstNumber": "09CQWPP2855E1Z6",
  //             "mobile": [
  //               "9935978023",
  //               "",
  //               ""
  //             ]
  //           },
  //           "collections": [],
  //           "_id": "667fd0cf03ef73de41cf6899",
  //           "partyName": "NEW DURGA MEDICAL STORE",
  //           "partyCode": "NGMSR",
  //           "address": [
  //             "BUDESWARAN,LUCKNOW",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:15:59.670Z",
  //           "updatedAt": "2024-07-12T10:53:18.390Z",
  //           "__v": 0,
  //           "paymentNotes": [
  //             "66910b1e9152bcbf0feba129"
  //           ]
  //         },
  //         "narration": "",
  //         "createdAt": "2024-07-12T10:53:18.333Z",
  //         "updatedAt": "2024-07-12T10:53:18.333Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "66911d5557529c1cff56784c",
  //         "billNumber": "T-000010",
  //         "billDate": "01/02/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "",
  //               "",
  //               ""
  //             ]
  //           },
  //           "collections": [],
  //           "paymentNotes": [],
  //           "_id": "667fd0ab03ef73de41cf4843",
  //           "partyName": "4% Sale",
  //           "partyCode": "4SALE",
  //           "address": [
  //             "",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:15:23.654Z",
  //           "updatedAt": "2024-07-12T12:11:24.677Z",
  //           "__v": 0
  //         },
  //         "narration": "test 1",
  //         "createdAt": "2024-07-12T12:11:01.440Z",
  //         "updatedAt": "2024-07-12T12:11:01.440Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "66911d6657529c1cff567855",
  //         "billNumber": "T-000010",
  //         "billDate": "01/02/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "",
  //               "",
  //               ""
  //             ]
  //           },
  //           "collections": [],
  //           "paymentNotes": [],
  //           "_id": "667fd0ab03ef73de41cf4843",
  //           "partyName": "4% Sale",
  //           "partyCode": "4SALE",
  //           "address": [
  //             "",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:15:23.654Z",
  //           "updatedAt": "2024-07-12T12:11:24.677Z",
  //           "__v": 0
  //         },
  //         "narration": "test 1",
  //         "createdAt": "2024-07-12T12:11:18.431Z",
  //         "updatedAt": "2024-07-12T12:11:18.431Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "66911d6857529c1cff567859",
  //         "billNumber": "T-000010",
  //         "billDate": "01/02/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "",
  //               "",
  //               ""
  //             ]
  //           },
  //           "collections": [],
  //           "paymentNotes": [],
  //           "_id": "667fd0ab03ef73de41cf4843",
  //           "partyName": "4% Sale",
  //           "partyCode": "4SALE",
  //           "address": [
  //             "",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:15:23.654Z",
  //           "updatedAt": "2024-07-12T12:11:24.677Z",
  //           "__v": 0
  //         },
  //         "narration": "test 1",
  //         "createdAt": "2024-07-12T12:11:20.672Z",
  //         "updatedAt": "2024-07-12T12:11:20.672Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "66911d6957529c1cff56785d",
  //         "billNumber": "T-000010",
  //         "billDate": "01/02/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "",
  //               "",
  //               ""
  //             ]
  //           },
  //           "collections": [],
  //           "paymentNotes": [],
  //           "_id": "667fd0ab03ef73de41cf4843",
  //           "partyName": "4% Sale",
  //           "partyCode": "4SALE",
  //           "address": [
  //             "",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:15:23.654Z",
  //           "updatedAt": "2024-07-12T12:11:24.677Z",
  //           "__v": 0
  //         },
  //         "narration": "test 1",
  //         "createdAt": "2024-07-12T12:11:21.880Z",
  //         "updatedAt": "2024-07-12T12:11:21.880Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "66911d6a57529c1cff567861",
  //         "billNumber": "T-000010",
  //         "billDate": "01/02/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "",
  //               "",
  //               ""
  //             ]
  //           },
  //           "collections": [],
  //           "paymentNotes": [],
  //           "_id": "667fd0ab03ef73de41cf4843",
  //           "partyName": "4% Sale",
  //           "partyCode": "4SALE",
  //           "address": [
  //             "",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:15:23.654Z",
  //           "updatedAt": "2024-07-12T12:11:24.677Z",
  //           "__v": 0
  //         },
  //         "narration": "test 1",
  //         "createdAt": "2024-07-12T12:11:22.795Z",
  //         "updatedAt": "2024-07-12T12:11:22.795Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "66911d6b57529c1cff567865",
  //         "billNumber": "T-000010",
  //         "billDate": "01/02/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "",
  //               "",
  //               ""
  //             ]
  //           },
  //           "collections": [],
  //           "paymentNotes": [],
  //           "_id": "667fd0ab03ef73de41cf4843",
  //           "partyName": "4% Sale",
  //           "partyCode": "4SALE",
  //           "address": [
  //             "",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:15:23.654Z",
  //           "updatedAt": "2024-07-12T12:11:24.677Z",
  //           "__v": 0
  //         },
  //         "narration": "test 1",
  //         "createdAt": "2024-07-12T12:11:23.741Z",
  //         "updatedAt": "2024-07-12T12:11:23.741Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "66911d6c57529c1cff567869",
  //         "billNumber": "T-000010",
  //         "billDate": "01/02/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "",
  //               "",
  //               ""
  //             ]
  //           },
  //           "collections": [],
  //           "paymentNotes": [],
  //           "_id": "667fd0ab03ef73de41cf4843",
  //           "partyName": "4% Sale",
  //           "partyCode": "4SALE",
  //           "address": [
  //             "",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:15:23.654Z",
  //           "updatedAt": "2024-07-12T12:11:24.677Z",
  //           "__v": 0
  //         },
  //         "narration": "test 1",
  //         "createdAt": "2024-07-12T12:11:24.637Z",
  //         "updatedAt": "2024-07-12T12:11:24.637Z",
  //         "__v": 0
  //       }
  //     ],
  //     "parties": [
  //       "DEEP MEDICAL & SURGICAL",
  //       "NEW FAROOQUI MEDICAL STORE",
  //       "NEW DURGA MEDICAL STORE",
  //       "4% Sale",
  //       "4% Sale",
  //       "4% Sale",
  //       "4% Sale",
  //       "4% Sale",
  //       "4% Sale",
  //       "4% Sale"
  //     ]
  //   },
  //   {
  //     "date": "2024-08-01",
  //     "notes": [
  //       {
  //         "_id": "66aa8b2845d669e4ddc08f40",
  //         "billNumber": "T-000010",
  //         "billDate": "01/08/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "7705037757",
  //               "",
  //               ""
  //             ]
  //           },
  //           "_id": "667fd0e103ef73de41cf7b2b",
  //           "partyName": "TANISH RASTOGI",
  //           "partyCode": "TND1",
  //           "address": [
  //             "LUCKNOW",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:16:17.654Z",
  //           "updatedAt": "2024-07-31T19:06:16.727Z",
  //           "__v": 8,
  //           "paymentNotes": [
  //             "669038a5b3b9b836a8cdba11",
  //             "66903a376167bc5ac92b01ac",
  //             "66903a9b95511a4d9a4c6dab",
  //             "66903ac27abb7602284eade5",
  //             "66903aeed252f3145e13c8ce",
  //             "66aa8b2845d669e4ddc08f40"
  //           ],
  //           "collections": [
  //             "66997a0c3ebf533f8a883cea",
  //             "66997a0c3ebf533f8a883ce0",
  //             "66997a0c3ebf533f8a883d74",
  //             "66997a0c3ebf533f8a883d76",
  //             "66997f7d955e54417a2aabe9",
  //             "66997f7d955e54417a2aab91",
  //             "66997f7d955e54417a2aac61",
  //             "66997f7d955e54417a2aac5f"
  //           ]
  //         },
  //         "narration": "hello world",
  //         "createdAt": "2024-07-31T19:06:16.646Z",
  //         "updatedAt": "2024-07-31T19:06:16.646Z",
  //         "__v": 0
  //       }
  //     ],
  //     "parties": [
  //       "TANISH RASTOGI"
  //     ]
  //   },
  //   {
  //     "date": "2024-08-01",
  //     "notes": [
  //       {
  //         "_id": "66aa8b2845d669e4ddc08f40",
  //         "billNumber": "T-000010",
  //         "billDate": "01/08/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "7705037757",
  //               "",
  //               ""
  //             ]
  //           },
  //           "_id": "667fd0e103ef73de41cf7b2b",
  //           "partyName": "TANISH RASTOGI",
  //           "partyCode": "TND1",
  //           "address": [
  //             "LUCKNOW",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:16:17.654Z",
  //           "updatedAt": "2024-07-31T19:06:16.727Z",
  //           "__v": 8,
  //           "paymentNotes": [
  //             "669038a5b3b9b836a8cdba11",
  //             "66903a376167bc5ac92b01ac",
  //             "66903a9b95511a4d9a4c6dab",
  //             "66903ac27abb7602284eade5",
  //             "66903aeed252f3145e13c8ce",
  //             "66aa8b2845d669e4ddc08f40"
  //           ],
  //           "collections": [
  //             "66997a0c3ebf533f8a883cea",
  //             "66997a0c3ebf533f8a883ce0",
  //             "66997a0c3ebf533f8a883d74",
  //             "66997a0c3ebf533f8a883d76",
  //             "66997f7d955e54417a2aabe9",
  //             "66997f7d955e54417a2aab91",
  //             "66997f7d955e54417a2aac61",
  //             "66997f7d955e54417a2aac5f"
  //           ]
  //         },
  //         "narration": "hello world",
  //         "createdAt": "2024-07-31T19:06:16.646Z",
  //         "updatedAt": "2024-07-31T19:06:16.646Z",
  //         "__v": 0
  //       }
  //     ],
  //     "parties": [
  //       "TANISH RASTOGI"
  //     ]
  //   },
  //   {
  //     "date": "2024-08-01",
  //     "notes": [
  //       {
  //         "_id": "66aa8b2845d669e4ddc08f40",
  //         "billNumber": "T-000010",
  //         "billDate": "01/08/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "7705037757",
  //               "",
  //               ""
  //             ]
  //           },
  //           "_id": "667fd0e103ef73de41cf7b2b",
  //           "partyName": "TANISH RASTOGI",
  //           "partyCode": "TND1",
  //           "address": [
  //             "LUCKNOW",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:16:17.654Z",
  //           "updatedAt": "2024-07-31T19:06:16.727Z",
  //           "__v": 8,
  //           "paymentNotes": [
  //             "669038a5b3b9b836a8cdba11",
  //             "66903a376167bc5ac92b01ac",
  //             "66903a9b95511a4d9a4c6dab",
  //             "66903ac27abb7602284eade5",
  //             "66903aeed252f3145e13c8ce",
  //             "66aa8b2845d669e4ddc08f40"
  //           ],
  //           "collections": [
  //             "66997a0c3ebf533f8a883cea",
  //             "66997a0c3ebf533f8a883ce0",
  //             "66997a0c3ebf533f8a883d74",
  //             "66997a0c3ebf533f8a883d76",
  //             "66997f7d955e54417a2aabe9",
  //             "66997f7d955e54417a2aab91",
  //             "66997f7d955e54417a2aac61",
  //             "66997f7d955e54417a2aac5f"
  //           ]
  //         },
  //         "narration": "hello world",
  //         "createdAt": "2024-07-31T19:06:16.646Z",
  //         "updatedAt": "2024-07-31T19:06:16.646Z",
  //         "__v": 0
  //       }
  //     ],
  //     "parties": [
  //       "TANISH RASTOGI"
  //     ]
  //   },
  //   {
  //     "date": "2024-08-01",
  //     "notes": [
  //       {
  //         "_id": "66aa8b2845d669e4ddc08f40",
  //         "billNumber": "T-000010",
  //         "billDate": "01/08/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "7705037757",
  //               "",
  //               ""
  //             ]
  //           },
  //           "_id": "667fd0e103ef73de41cf7b2b",
  //           "partyName": "TANISH RASTOGI",
  //           "partyCode": "TND1",
  //           "address": [
  //             "LUCKNOW",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:16:17.654Z",
  //           "updatedAt": "2024-07-31T19:06:16.727Z",
  //           "__v": 8,
  //           "paymentNotes": [
  //             "669038a5b3b9b836a8cdba11",
  //             "66903a376167bc5ac92b01ac",
  //             "66903a9b95511a4d9a4c6dab",
  //             "66903ac27abb7602284eade5",
  //             "66903aeed252f3145e13c8ce",
  //             "66aa8b2845d669e4ddc08f40"
  //           ],
  //           "collections": [
  //             "66997a0c3ebf533f8a883cea",
  //             "66997a0c3ebf533f8a883ce0",
  //             "66997a0c3ebf533f8a883d74",
  //             "66997a0c3ebf533f8a883d76",
  //             "66997f7d955e54417a2aabe9",
  //             "66997f7d955e54417a2aab91",
  //             "66997f7d955e54417a2aac61",
  //             "66997f7d955e54417a2aac5f"
  //           ]
  //         },
  //         "narration": "hello world",
  //         "createdAt": "2024-07-31T19:06:16.646Z",
  //         "updatedAt": "2024-07-31T19:06:16.646Z",
  //         "__v": 0
  //       }
  //     ],
  //     "parties": [
  //       "TANISH RASTOGI"
  //     ]
  //   },
  //   {
  //     "date": "2024-08-01",
  //     "notes": [
  //       {
  //         "_id": "66aa8b2845d669e4ddc08f40",
  //         "billNumber": "T-000010",
  //         "billDate": "01/08/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "7705037757",
  //               "",
  //               ""
  //             ]
  //           },
  //           "_id": "667fd0e103ef73de41cf7b2b",
  //           "partyName": "TANISH RASTOGI",
  //           "partyCode": "TND1",
  //           "address": [
  //             "LUCKNOW",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:16:17.654Z",
  //           "updatedAt": "2024-07-31T19:06:16.727Z",
  //           "__v": 8,
  //           "paymentNotes": [
  //             "669038a5b3b9b836a8cdba11",
  //             "66903a376167bc5ac92b01ac",
  //             "66903a9b95511a4d9a4c6dab",
  //             "66903ac27abb7602284eade5",
  //             "66903aeed252f3145e13c8ce",
  //             "66aa8b2845d669e4ddc08f40"
  //           ],
  //           "collections": [
  //             "66997a0c3ebf533f8a883cea",
  //             "66997a0c3ebf533f8a883ce0",
  //             "66997a0c3ebf533f8a883d74",
  //             "66997a0c3ebf533f8a883d76",
  //             "66997f7d955e54417a2aabe9",
  //             "66997f7d955e54417a2aab91",
  //             "66997f7d955e54417a2aac61",
  //             "66997f7d955e54417a2aac5f"
  //           ]
  //         },
  //         "narration": "hello world",
  //         "createdAt": "2024-07-31T19:06:16.646Z",
  //         "updatedAt": "2024-07-31T19:06:16.646Z",
  //         "__v": 0
  //       }
  //     ],
  //     "parties": [
  //       "TANISH RASTOGI"
  //     ]
  //   },
  //   {
  //     "date": "2024-08-01",
  //     "notes": [
  //       {
  //         "_id": "66aa8b2845d669e4ddc08f40",
  //         "billNumber": "T-000010",
  //         "billDate": "01/08/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "7705037757",
  //               "",
  //               ""
  //             ]
  //           },
  //           "_id": "667fd0e103ef73de41cf7b2b",
  //           "partyName": "TANISH RASTOGI",
  //           "partyCode": "TND1",
  //           "address": [
  //             "LUCKNOW",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:16:17.654Z",
  //           "updatedAt": "2024-07-31T19:06:16.727Z",
  //           "__v": 8,
  //           "paymentNotes": [
  //             "669038a5b3b9b836a8cdba11",
  //             "66903a376167bc5ac92b01ac",
  //             "66903a9b95511a4d9a4c6dab",
  //             "66903ac27abb7602284eade5",
  //             "66903aeed252f3145e13c8ce",
  //             "66aa8b2845d669e4ddc08f40"
  //           ],
  //           "collections": [
  //             "66997a0c3ebf533f8a883cea",
  //             "66997a0c3ebf533f8a883ce0",
  //             "66997a0c3ebf533f8a883d74",
  //             "66997a0c3ebf533f8a883d76",
  //             "66997f7d955e54417a2aabe9",
  //             "66997f7d955e54417a2aab91",
  //             "66997f7d955e54417a2aac61",
  //             "66997f7d955e54417a2aac5f"
  //           ]
  //         },
  //         "narration": "hello world",
  //         "createdAt": "2024-07-31T19:06:16.646Z",
  //         "updatedAt": "2024-07-31T19:06:16.646Z",
  //         "__v": 0
  //       }
  //     ],
  //     "parties": [
  //       "TANISH RASTOGI"
  //     ]
  //   },
  //   {
  //     "date": "2024-08-01",
  //     "notes": [
  //       {
  //         "_id": "66aa8b2845d669e4ddc08f40",
  //         "billNumber": "T-000010",
  //         "billDate": "01/08/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "7705037757",
  //               "",
  //               ""
  //             ]
  //           },
  //           "_id": "667fd0e103ef73de41cf7b2b",
  //           "partyName": "TANISH RASTOGI",
  //           "partyCode": "TND1",
  //           "address": [
  //             "LUCKNOW",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:16:17.654Z",
  //           "updatedAt": "2024-07-31T19:06:16.727Z",
  //           "__v": 8,
  //           "paymentNotes": [
  //             "669038a5b3b9b836a8cdba11",
  //             "66903a376167bc5ac92b01ac",
  //             "66903a9b95511a4d9a4c6dab",
  //             "66903ac27abb7602284eade5",
  //             "66903aeed252f3145e13c8ce",
  //             "66aa8b2845d669e4ddc08f40"
  //           ],
  //           "collections": [
  //             "66997a0c3ebf533f8a883cea",
  //             "66997a0c3ebf533f8a883ce0",
  //             "66997a0c3ebf533f8a883d74",
  //             "66997a0c3ebf533f8a883d76",
  //             "66997f7d955e54417a2aabe9",
  //             "66997f7d955e54417a2aab91",
  //             "66997f7d955e54417a2aac61",
  //             "66997f7d955e54417a2aac5f"
  //           ]
  //         },
  //         "narration": "hello world",
  //         "createdAt": "2024-07-31T19:06:16.646Z",
  //         "updatedAt": "2024-07-31T19:06:16.646Z",
  //         "__v": 0
  //       }
  //     ],
  //     "parties": [
  //       "TANISH RASTOGI"
  //     ]
  //   },
  //   {
  //     "date": "2024-08-01",
  //     "notes": [
  //       {
  //         "_id": "66aa8b2845d669e4ddc08f40",
  //         "billNumber": "T-000010",
  //         "billDate": "01/08/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "7705037757",
  //               "",
  //               ""
  //             ]
  //           },
  //           "_id": "667fd0e103ef73de41cf7b2b",
  //           "partyName": "TANISH RASTOGI",
  //           "partyCode": "TND1",
  //           "address": [
  //             "LUCKNOW",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:16:17.654Z",
  //           "updatedAt": "2024-07-31T19:06:16.727Z",
  //           "__v": 8,
  //           "paymentNotes": [
  //             "669038a5b3b9b836a8cdba11",
  //             "66903a376167bc5ac92b01ac",
  //             "66903a9b95511a4d9a4c6dab",
  //             "66903ac27abb7602284eade5",
  //             "66903aeed252f3145e13c8ce",
  //             "66aa8b2845d669e4ddc08f40"
  //           ],
  //           "collections": [
  //             "66997a0c3ebf533f8a883cea",
  //             "66997a0c3ebf533f8a883ce0",
  //             "66997a0c3ebf533f8a883d74",
  //             "66997a0c3ebf533f8a883d76",
  //             "66997f7d955e54417a2aabe9",
  //             "66997f7d955e54417a2aab91",
  //             "66997f7d955e54417a2aac61",
  //             "66997f7d955e54417a2aac5f"
  //           ]
  //         },
  //         "narration": "hello world",
  //         "createdAt": "2024-07-31T19:06:16.646Z",
  //         "updatedAt": "2024-07-31T19:06:16.646Z",
  //         "__v": 0
  //       }
  //     ],
  //     "parties": [
  //       "TANISH RASTOGI"
  //     ]
  //   },
  //   {
  //     "date": "2024-08-01",
  //     "notes": [
  //       {
  //         "_id": "66aa8b2845d669e4ddc08f40",
  //         "billNumber": "T-000010",
  //         "billDate": "01/08/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "7705037757",
  //               "",
  //               ""
  //             ]
  //           },
  //           "_id": "667fd0e103ef73de41cf7b2b",
  //           "partyName": "TANISH RASTOGI",
  //           "partyCode": "TND1",
  //           "address": [
  //             "LUCKNOW",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:16:17.654Z",
  //           "updatedAt": "2024-07-31T19:06:16.727Z",
  //           "__v": 8,
  //           "paymentNotes": [
  //             "669038a5b3b9b836a8cdba11",
  //             "66903a376167bc5ac92b01ac",
  //             "66903a9b95511a4d9a4c6dab",
  //             "66903ac27abb7602284eade5",
  //             "66903aeed252f3145e13c8ce",
  //             "66aa8b2845d669e4ddc08f40"
  //           ],
  //           "collections": [
  //             "66997a0c3ebf533f8a883cea",
  //             "66997a0c3ebf533f8a883ce0",
  //             "66997a0c3ebf533f8a883d74",
  //             "66997a0c3ebf533f8a883d76",
  //             "66997f7d955e54417a2aabe9",
  //             "66997f7d955e54417a2aab91",
  //             "66997f7d955e54417a2aac61",
  //             "66997f7d955e54417a2aac5f"
  //           ]
  //         },
  //         "narration": "hello world",
  //         "createdAt": "2024-07-31T19:06:16.646Z",
  //         "updatedAt": "2024-07-31T19:06:16.646Z",
  //         "__v": 0
  //       }
  //     ],
  //     "parties": [
  //       "TANISH RASTOGI"
  //     ]
  //   },
  //   {
  //     "date": "2024-08-01",
  //     "notes": [
  //       {
  //         "_id": "66aa8b2845d669e4ddc08f40",
  //         "billNumber": "T-000010",
  //         "billDate": "01/08/2024",
  //         "party": {
  //           "details": {
  //             "dlNo1": "",
  //             "dlNo2": "",
  //             "gstNumber": "",
  //             "mobile": [
  //               "7705037757",
  //               "",
  //               ""
  //             ]
  //           },
  //           "_id": "667fd0e103ef73de41cf7b2b",
  //           "partyName": "TANISH RASTOGI",
  //           "partyCode": "TND1",
  //           "address": [
  //             "LUCKNOW",
  //             "",
  //             ""
  //           ],
  //           "bills": [],
  //           "purchases": [],
  //           "searchTags": [],
  //           "createdAt": "2024-06-29T09:16:17.654Z",
  //           "updatedAt": "2024-07-31T19:06:16.727Z",
  //           "__v": 8,
  //           "paymentNotes": [
  //             "669038a5b3b9b836a8cdba11",
  //             "66903a376167bc5ac92b01ac",
  //             "66903a9b95511a4d9a4c6dab",
  //             "66903ac27abb7602284eade5",
  //             "66903aeed252f3145e13c8ce",
  //             "66aa8b2845d669e4ddc08f40"
  //           ],
  //           "collections": [
  //             "66997a0c3ebf533f8a883cea",
  //             "66997a0c3ebf533f8a883ce0",
  //             "66997a0c3ebf533f8a883d74",
  //             "66997a0c3ebf533f8a883d76",
  //             "66997f7d955e54417a2aabe9",
  //             "66997f7d955e54417a2aab91",
  //             "66997f7d955e54417a2aac61",
  //             "66997f7d955e54417a2aac5f"
  //           ]
  //         },
  //         "narration": "hello world",
  //         "createdAt": "2024-07-31T19:06:16.646Z",
  //         "updatedAt": "2024-07-31T19:06:16.646Z",
  //         "__v": 0
  //       }
  //     ],
  //     "parties": [
  //       "TANISH RASTOGI"
  //     ]
  //   },

  // ]

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {data} = await fetchAllNotes();
      setData(data);
      console.log(data);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='fetch-all-payment-notes'>
      {
        data?.map((note, index) => {
          return <div className='notes-container'>
            <img className='note-bg-img' src={img}></img>
            <p className='date'>{note.date}</p>
            <div className='party-names' style={{}}>
              {
                note.parties.map((party, index)=>{
                  return index<4?<p>{party.length>7?party.slice(0, 20):party}</p>:""
                })
              }
            </div>
          </div>
        })
      }
    </div>
  )
}

export default FetchAll