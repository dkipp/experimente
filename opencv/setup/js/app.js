
    // codeformat: Shift + Alt + F
    let img1 = document.getElementById('imageSrc01');
    let img2 = document.getElementById('imageSrc02');

    function onOpenCvReady() {

      console.log('OpenCV.js is ready.');

      let srcMat1 = cv.imread(img1);
      let srcMat2 = cv.imread(img2);

      addFigure(srcMat1, 'OpenCV Input 1');
      addFigure(srcMat2, 'OpenCV Input 2');

      splitRGBA(srcMat1);



      /*
       *  Filter
       */
      addHeading('Filter:');

      // Canny Edge Detection
      let dst = new cv.Mat();
      cv.cvtColor(srcMat1, srcMat1, cv.COLOR_RGB2GRAY, 0);
      cv.Canny(srcMat1, dst, 50, 100, 3, false); // You can try more different parameters
      addFigure(dst, 'Canny Edge Detection');
      dst.delete();


      // next
      addHeading('New:');
      let mat01 = cv.Mat.zeros(233, 350, cv.CV_8UC3);
      addFigure(mat01, 'cv.Mat.zeros');

      let mat02 = cv.Mat.ones(233, 350, cv.CV_8S);
      addFigure(mat02, 'cv.Mat.ones');

      let mat03 = new cv.Mat(233, 350, cv.CV_8UC3, new cv.Scalar(130, 100, 70) );
      addFigure(mat03, 'cv.Mat with rgb');
    }

    function addFigure(mat, caption) {
      let root = document.getElementById('content');

      let tpl = document.querySelector('#inputs figure').cloneNode(true);
      cv.imshow(tpl.querySelector('canvas'), mat);

      tpl.querySelector('figcaption').textContent = caption;
      root.appendChild(tpl);
    }

    function addHeading(text) {
      let root = document.getElementById('content');
      let heading = document.createElement('h2');
      heading.textContent = text;
      root.appendChild(heading);
    }


    /*
     *  RGBA Kanäle
     */
    function splitRGBA(cvMat) {
      
      addHeading('RGBA Kanäle:')

      let rgbaPlanes = new cv.MatVector();
      // Split the Mat
      cv.split(cvMat, rgbaPlanes);

      // Get R channel
      addFigure(rgbaPlanes.get(0), 'Rot');
      // Get G channel
      addFigure(rgbaPlanes.get(1), 'Grün');
      // Get B channel
      addFigure(rgbaPlanes.get(2), 'Blau');
      // Get Mask channel
      addFigure(rgbaPlanes.get(3), 'Alpha');

      //cleanup
      rgbaPlanes.delete();
    }