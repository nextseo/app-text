import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [text, setText] = useState("");
  // const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data_1, setData_1] = useState("")

  const [hilight, setHiLight] = useState(null);


  // คำผิด
  const handleTextWrong = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/check_text`,
        {
          text,
        }
      );
      // console.log(res);
      if (res.status === 200) {
        toast.success('ทำรายการสำเร็จ');
        setData_1(res.data)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  //   คำต้องห้าม
  const handleFindWord = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/find_word`,
        { text }
      );

console.log(res.data);   
      if (res.status === 200) {
        toast.success('ทำรายการสำเร็จ');
        // const test = JSON.parse(res.data)
        setHiLight(res.data)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  // ภาษาอังกฤษ
  const handleEnglish = async()=>{
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/english`,
        { text }
      );

   
      if (res.status === 200) {
        toast.success('ทำรายการสำเร็จ');
        setData_1(res.data)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  }

  // Reset ปุ่ม
  const resetBtn = () => {
    setHiLight(null);
    setData_1("");
    setData2([]);
    setText("")
  };

  useEffect(() => {}, [data2]);

  return (
    <div>
      {/* {JSON.stringify(hilight)} */}
      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="w-full md:mx-10 ">
          <h2 className="text-lg text-gray-700 font-semibold">
            กรอกข้อความที่ต้องการ
          </h2>
          <div className="mt-5 ">
            {hilight ? (
              <HighlightedText text={text} highlights={hilight} />
            ) : (
              <textarea
              value={text || ""}
                className="w-full shadow-lg rounded-md h-96 py-5 px-10"
                onChange={(e) => setText(e.target.value)}
              />
            )}
          </div>

          <div className="flex flex-wrap flex-row gap-4 mt-2">
            <button
              onClick={handleFindWord}
              className={
                hilight
                  ? "bg-gray-600 text-white py-2 px-2 rounded-md"
                  : "bg-black text-white py-2 px-2 rounded-md"
              }
              disabled={hilight !== null}
            >
              ค้นหาคำละเมิด
            </button>
            <button
              onClick={handleTextWrong}
              className={
                hilight
                  ? "bg-red-800 hover:bg-red-900 text-white py-2 px-2 rounded-md"
                  : "bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded-md"
              }
              disabled={hilight !== null}
            >
              ค้นหาคำผิด
            </button>

            <button onClick={handleEnglish} className={"bg-blue-800 hover:bg-blue-900 text-white py-2 px-2 rounded-md"}>ค้นหาคำผิดภาษาอังกฤษ</button>
            <button
              onClick={resetBtn}
              className={"bg-green-700 hover:bg-green-800 text-white py-2 px-2 rounded-md"}
            >
              รีเซ็ท
            </button>
          </div>
        </div>

        <div className="w-full my-10 md:my-0">
          <h2 className="text-lg text-gray-700 font-semibold">แสดงผล</h2>

          <div className="bg-white border-2 border-gray-300 shadow-md rounded-md px-5 py-5 mt-5">
            <h2 className="text-lg text-gray-900 font-semibold">คำละเมิด</h2>

            <hr className="border-1 border-gray-300 mt-10" />

            <h2 className="text-lg text-gray-900 mt-10 font-semibold">คำผิด</h2>

            <p>{data_1 || ""}</p>

          </div>
        </div>
      </div>

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
      <span key={index} style={{ backgroundColor: "yellow" }}>
        {text.substring(start, end)}
      </span>
    );
    lastIndex = end;
  });

  parts.push(text.substring(lastIndex));

  return (
    <div className="w-full bg-white shadow-lg rounded-md h-96 py-5 px-10">
      {parts}
    </div>
  );
};

//   const text = กระตุ้นสมองให้ไวด้วยการเพิ่มขนาด
// const highlights   = [{"start":23,"end":31},{"start":14,"end":15}]

// สิ่งที่ได้ คำซ้ำกัน 2 รอบ
// กระตุ้นสมองให้ไวด้วยการเพิ่มขนาไวด้วยการเพิ่มขนาไ

// ข้อความต้นฉบับ = กระตุ้นสมองให้ไวด้วยการเพิ่มขนาด
// ข้อความที่ได้ = กระตุ้นสมองให้ไวด้วยการเพิ่มขนาไวด้วยการเพิ่มขนาไวด้วยการเพิ่มขนาด

