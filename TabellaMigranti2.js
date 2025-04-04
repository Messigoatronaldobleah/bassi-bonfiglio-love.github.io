var created = false;

function apri(input) {
  if (!created) {
    created = true;
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    let m = [];
    reader.onload = function () {
      let content = reader.result;
      let v = content.split("\n");
      for (let i = 0; i < v.length; i++) {
        m[i] = v[i].split(",");
      }

      
      let container = document.getElementById("container");
      let table = document.createElement("table");
      table.className = "table";
      for (let r = 0; r < m.length; r++) {
        let tableRow = document.createElement("tr");
        for (let c = 0; c < m[0].length; c++) {
          let tableCol;
          if (r == 0) {
            tableCol = document.createElement("th");
            if (c == 0)
              tableCol.className = "top-left";
            else if (c == m[0].length - 1)
              tableCol.className = "top-right";
          } else {
            tableCol = document.createElement("td");
            if (r == m.length - 1)
              if (c == 0)
                tableCol.className = "bottom-left";
              else if (c == m[0].length - 1)
                tableCol.className = "bottom-right";
          }
          let data = m[r][c].substring(1, m[r][c].length - 1);
          tableCol.innerText = data;
          tableRow.append(tableCol);
        }
        table.append(tableRow);
      }
      container.append(table);

 
      let h1 = document.createElement("h1");
      h1.innerText = "Grafico";
      container.append(h1);

      
      const xValues = [];
      const yValues = [];
      for (let i = 1; i < m.length; i++) {
        xValues[i - 1] = parseInt(m[i][0].substring(1, m[i][0].length - 1));
        yValues[i - 1] = parseInt(m[i][1].substring(1, m[i][1].length - 1));
      }

      
      var width = 800, height = 300;
      var kw = width / (max(xValues) - min(xValues)), kh = height / (max(yValues) - 0);

     
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");

      
      ctx.beginPath();
      ctx.moveTo(50, height - 50); 
      ctx.lineTo(width - 50, height - 50); 
      ctx.lineTo(50, height - 50); 
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();

      
      ctx.fillText("X", width - 30, height - 30); 
      ctx.fillText("Y", 10, 30);  

     
      const stepX = Math.round(width / (xValues.length + 1));
      for (let i = 0; i < xValues.length; i++) {
        const xPos = 50 + (i * stepX);
        ctx.fillText(xValues[i], xPos, height - 30);
      }

      
      const stepY = Math.round(height / (yValues.length + 1)); 
      for (let i = 0; i < yValues.length; i++) {
        const yPos = height - 50 - (i * stepY);
        ctx.fillText(yValues[i], 20, yPos);  
      }

      ctx.beginPath();
      for (let i = 0; i < xValues.length; i++) {
        const xPos = 50 + (xValues[i] - xValues[0]) * kw;
        const yPos = height - 50 - (yValues[i]) * kh;
        if (i === 0) {
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos); 
        }
      }
      ctx.lineWidth = 2;
      ctx.strokeStyle = "blue";
      ctx.lineCap = "round";
      ctx.stroke();
    };
  } else {
    let table = document.querySelector("table.table");
    table.remove();
    created = false;
    apri(input);
  }
}

function max(v) {
  let max = v[0];
  for (let i = 0; i < v.length; i++) {
    if (v[i] > max) max = v[i];
  }
  return max;
}

function min(v) {
  let min = v[0];
  for (let i = 0; i < v.length; i++) {
    if (v[i] < min) min = v[i];
  }
  return min;
}