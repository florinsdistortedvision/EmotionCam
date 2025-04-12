export async function loadImage() {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.onerror = (e) => {
          reject(e);
        };
        reader.readAsDataURL(file);
      } else {
        reject(new Error("No file selected"));
      }
    };
    input.click();
  });
}

function applyGaussianBlur(ctx, width, height, radius) {
  ctx.filter = `blur(${radius}px)`;
  ctx.drawImage(ctx.canvas, 0, 0, width, height);
  ctx.filter = "none";
}

function applyNoise(ctx, width, height, noiseLevel) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const noise = noiseLevel * 255;

  for (let i = 0; i < data.length; i += 4) {
    const rand = (Math.random() - 0.5) * noise;
    data[i] += rand; // Red
    data[i + 1] += rand; // Green
    data[i + 2] += rand; // Blue
  }

  ctx.putImageData(imageData, 0, 0);
}

function increaseHighlights(ctx, width, height, percentage) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const factor = 1 + percentage / 100;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * factor); // Red
    data[i + 1] = Math.min(255, data[i + 1] * factor); // Green
    data[i + 2] = Math.min(255, data[i + 2] * factor); // Blue
  }

  ctx.putImageData(imageData, 0, 0);
}

export async function processImage(imageSrc) {
  const img = new Image();
  img.src = imageSrc;

  return new Promise((resolve) => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const processCameronMode = () => {
        canvas.width = 600;
        canvas.height = 400;

        ctx.drawImage(img, 0, 0, 600, 400);

        applyGaussianBlur(ctx, 600, 400, 0.4);
        applyNoise(ctx, 600, 400, 0.05);
        increaseHighlights(ctx, 600, 400, 20);

        const processedImage = canvas.toDataURL();
        const upscaledCanvas = document.createElement("canvas");
        const upscaledCtx = upscaledCanvas.getContext("2d");
        upscaledCanvas.width = 640;
        upscaledCanvas.height = 480;
        const processedImg = new Image();
        processedImg.src = processedImage;

        return new Promise((resolve) => {
          processedImg.onload = () => {
            upscaledCtx.drawImage(processedImg, 0, 0, 640, 480);
            resolve(upscaledCanvas.toDataURL("image/jpeg", 0.3));
          };
        });
      };

      const processMaroonMode = () => {
        canvas.width = 800;
        canvas.height = 700;

        const shakeAmount = 1.5;
        ctx.drawImage(
          img,
          0 + (Math.random() * shakeAmount - shakeAmount / 2),
          0 + (Math.random() * shakeAmount - shakeAmount / 2),
          800,
          700,
        );

        applyGaussianBlur(ctx, 800, 700, 0.7);
        applyNoise(ctx, 800, 700, 0.06);
        increaseHighlights(ctx, 800, 700, 15);

        const processedImage = canvas.toDataURL();
        const upscaledCanvas = document.createElement("canvas");
        const upscaledCtx = upscaledCanvas.getContext("2d");
        upscaledCanvas.width = 1200;
        upscaledCanvas.height = 900;
        const processedImg = new Image();
        processedImg.src = processedImage;

        return new Promise((resolve) => {
          processedImg.onload = () => {
            upscaledCtx.drawImage(
              processedImg,
              0 + (Math.random() * shakeAmount - shakeAmount / 2),
              0 + (Math.random() * shakeAmount - shakeAmount / 2),
              1200,
              900,
            );
            resolve(upscaledCanvas.toDataURL("image/jpeg", 0.5));
          };
        });
      };

      Promise.all([processCameronMode(), processMaroonMode()]).then(
        ([cameronImage, maroonImage]) => {
          resolve({ cameronImage, maroonImage });
        },
      );
    };
  });
}
