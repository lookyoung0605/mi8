import React, { useState } from "react";
import axios from "axios";

function LoadingModal({ show }) {
  if (!show) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        로딩 중...
      </div>
    </div>
  );
}

export default function App() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "id":
        setId(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleClick = async (event) => {
    if (id === "" || password === "") {
      alert("Submit 이벤트가 중단되었습니다.");
      event.preventDefault();
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        id: id,
        pw: password,
      });

      console.log("data");
      console.log(response.data);
    } catch (error) {
      console.log("error");
      console.log(error);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  return (
    <div>
      <input name="id" value={id} onChange={handleChange} />
      <input
        name="password"
        value={password}
        type="password"
        onChange={handleChange}
      />
      <input
        type="submit"
        value={"로그인"}
        onClick={handleClick}
        disabled={isLoading}
      />
      <LoadingModal show={isLoading} />
    </div>
  );
}
