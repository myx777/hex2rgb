import { ChangeEventHandler, FC, useState } from "react";

// из hex в rgb
export const ChangeColor: FC = () => {
  const [color, setColor] = useState<string>("#");
  const [backgrondColor, setBackgroundColor] =
    useState<string>("rgb(255 255 255)");
  const [error, setError] = useState<boolean>(false);

  //обработчик состояния
  const handlySetColor: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setColor(value);

    //сброс ошибки и цвета
    if (value.length < 7) {
      setError(false);
      setBackgroundColor("rgb(255 255 255)");
      return;
    }
    //обработка валидного и ложного промта
    if (value.length === 7) {
      setError(false);
      const hex = value.startsWith("#", 0) ? value.substring(1) : value;
      const bigint: number = parseInt(hex, 16);

      if (!Number.isNaN(bigint)) {
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        const rgb = `rgb(${r} ${g} ${b})`;
        setBackgroundColor(rgb);
        console.log(value);
        console.log(backgrondColor);
      } else {
        setError(true);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: backgrondColor,
        width: "100vw",
        height: "100vh",
        margin: "0",
      }}
    >
      <div style={{ width: "max-content" }}>
        <label htmlFor="inputColor">Введите HEX</label>
        <form>
          <input
            type="text"
            placeholder="введи HEX"
            value={color}
            onChange={handlySetColor}
          />
        </form>

        <div
          style={{
            backgroundColor: backgrondColor,
            width: "20vw",
            textAlign: "center",
            border: "2px solid black",
            margin: "auto",
          }}
        >
          {error ? (
            <p style={{ color: "black" }}>ошибка</p>
          ) : (
            <p style={{ color: "white" }}>{backgrondColor}</p>
          )}
        </div>
      </div>
    </div>
  );
};
