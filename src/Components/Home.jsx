import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [data2 , setData2] = useState([])
  const highlights = [[23, 31], [14, 15]]; // ตำแหน่งที่ต้องการไฮไลท์ในรูปแบบของ array
  const [hilight , setHiLight] = useState(null)


//   คำต้องห้าม
  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/text_wrong`);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

//   คำผิด
  const fetchData2 = async()=>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/find_word`);
        console.log(res.data);
        if (res.status === 200) {
          setData2(res.data);

          const newData = res.data.map((item)=> {
            return {
                start: item.startword,
                end : item.endword + 1
            }
          })
          setHiLight(newData)
        

       
        }
      } catch (error) {
        console.log(error);
      }
  }

  // คำผิด
  const handleTextWrong = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/check_text`, {
        text,
      });
      console.log(res);
      if(res.status === 200){
        toast.success(res.data.message)
        setTimeout(() => {
            fetchData()
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data)

    }
  };

//   คำต้องห้าม
  const handleFindWord = async()=>{
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/find_word`, {text})
        console.log(res);
        if(res.status === 200){
          toast.success(res.data.message)
            setTimeout(() => {
                fetchData2()
            }, 3000);
          }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data)

    }
  }

useEffect(()=>{

},[data2])

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="w-full mx-10 ">
          <h2 className="text-lg text-gray-700">กรอกข้อความที่ต้องการ</h2>
          <div className="mt-5 ">
            <textarea
              className="w-full shadow-lg rounded-md h-96 py-5 px-10"
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex flex-row gap-4 mt-2">
            <button onClick={handleFindWord}  className="bg-black text-white py-2 px-2 rounded-md">
              คำต้องห้าม
            </button>
            <button
              onClick={handleTextWrong}
              className="bg-red-500 text-white py-2 px-2 rounded-md"
            >
              คำผิด
            </button>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-lg text-gray-700">แสดงผล</h2>

          <div className="bg-white border-2 border-gray-300 shadow-md rounded-md px-5 py-5 mt-5">
            <h2 className="text-lg text-gray-700">คำต้องห้าม</h2>
           
           
            <ul className="mt-2">
              {data2.map((item, index) => (
                <li key={index} className="flex flex-row justify-between mt-1">
                  {item.stopwordgroup}{" "}
             
                </li>
              ))}
            </ul>

            <hr className="border-1 border-gray-300 mt-10" />

            <h2 className="text-lg text-gray-700 mt-10">คำผิด</h2>

            <ul className="mt-2">
              {data.map((item, index) => (
                <li key={index} className="flex flex-row justify-between mt-1">
                  {item.editword}{" "}
                  <button className="bg-red-500 px-2 py-1 rounded-md text-white">
                    ลบ
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {hilight && (
        <HighlightedText text={text} highlights={hilight} />
      )}
      

    </div>
  );
};

export default Home;

const HighlightedText = ({ text, highlights }) => {
    // สร้างโค้ดเพื่อแบ่งข้อความเป็นส่วนๆ และเน้นส่วนที่ต้องการไฮไลท์
    const parts = [];
    let lastIndex = 0;
  
    highlights.forEach((highlight, index) => {
      const { start, end } = highlight;
      parts.push(text.substring(lastIndex, start));
      parts.push(
        <span key={index} style={{ backgroundColor: 'yellow' }}>
          {text.substring(start, end)}
        </span>
      );
      lastIndex = end;
    });
  
    parts.push(text.substring(lastIndex));
  
    return <div>{parts}</div>;
  };


//   const text = กระตุ้นสมองให้ไวด้วยการเพิ่มขนาด
// const highlights   = [{"start":23,"end":31},{"start":14,"end":15}]

// สิ่งที่ได้ คำซ้ำกัน 2 รอบ 
// กระตุ้นสมองให้ไวด้วยการเพิ่มขนาไวด้วยการเพิ่มขนาไ 

// ข้อความต้นฉบับ = กระตุ้นสมองให้ไวด้วยการเพิ่มขนาด
// ข้อความที่ได้ = กระตุ้นสมองให้ไวด้วยการเพิ่มขนาไวด้วยการเพิ่มขนาไวด้วยการเพิ่มขนาด