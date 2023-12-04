const products = [
    {
      pName: 'Addicolor 3-Stripes',
      pDes: "Men's Fresh Stretch Oxford Shirt",
      pGender: 1,
      pColor: ['#23ef45', '#000000','#ff0000','#2b2b2b'],
      pCategory: 'Discount',
      pPrice: 40000,
      pDiscount: 0,
      pRate: 4,
      pCode: 'M102',
      pLsize: false,
      pMsize: false,
      pSsize: false,
      pStock: 0,
      pPhoto: './img/img1.jpg'
    },
    {
      pName: 'Fresh Stretch Oxford Shirt',
      pDes: "Women's Originals",
      pGender: 2,
      pColor: ['#060047', '#B3005E', '#FF5F9E'],
      pCategory: 'Popular',
      pPrice: 100000,
      pDiscount: 100,
      pRate: 3.8,
      pCode: 'M102',
      pLsize: false,
      pMsize: true,
      pSsize: true,
      pStock: 14,
      pPhoto: './img/img2.jpg',
    },
    {
      pName: 'Printed Tee',
      pDes: "Women's Altitude Printed Tee",
      pGender: 1,
      pColor: ['#C0EEE4', '#FFCAC8'],
      pCategory: 'Popular',
      pPrice: 25000,
      pDiscount: 7,
      pRate: 5,
      pCode: 'M103',
      pLsize: true,
      pMsize: true,
      pSsize: false,
      pStock: 20,
      pPhoto: './img/img3.jpg',
    },
    {
      pName: 'BASKETBALL TREFOIL JERSEY',
      pDes: "Men's BASKETBALL TREFOIL JERSEY",
      pGender: 1,
      pColor: ['#2192FF', '#9CFF2E', '#FDFF00', '#38E54D'],
      pCategory: 'Sale',
      pPrice: 40000,
      pDiscount: 20,
      pRate: 3.5,
      pCode: 'M104',
      pLsize: false,
      pMsize: true,
      pSsize: false,
      pStock: 5,
      pPhoto: './img/img4.jpg',
    }
  ];

  initload();
  
  function initload(){
  
    let main= document.getElementById("main");

    for(const value of products){
      let gender = genderStatus(value.pGender);
      let genderColor = gendercolor(value.pGender);
      let lsize = sizecheck(value.pLsize);
      let msize = sizecheck(value.pMsize);
      let ssize = sizecheck(value.pSsize);
      let discountedPrice = calculateDiscountedPrice(
        value.pPrice,
        value.pDiscount
      );
      let colorItem = color(value.pColor); // pColor is array
      let notshow = isShow(discountedPrice);
      let stock = soldOut(value.pStock);

      // Don't show old price when 0% off
      function isShow(discountedPrice) {
        let oldprice = parseInt(discountedPrice);
        return oldprice == value.pPrice ? "notshow" : '';
      }
      // stock 0 or not
      function soldOut(stock) {
        return stock<0 ? "Sold Out": stock + " left";
      
      }

      main.innerHTML += `
       <div class="card">
       <p class="gender ${genderColor}">${gender}</p>
       <div class="imgdiv" style="background-image: url(${value.pPhoto});">
       </div>


       <div class="info1">
       <div><p class="name">${value.pName}</p>
       <p class="des">${value.pDes}</p>
       </div>
       <p class="catagory">${value.pCategory}</p>
       <p class="rate"><ion-icon name="star"></ion-icon><span>${value.pRate}</span></p>
    </div>

       <div class="info2">
          <div class="colors">
          ${colorItem}
          </div>
          <div class="size">
              <p class="lsize ${lsize}">L</p>
              <p class="msize ${msize}">M</p>
              <p class="ssize ${ssize}">S</p>
              <p class="stock">${stock}</p>
          </div>
         
       </div>

       <div class="info3">
          <p class="oldprice ${notshow}">${value.pPrice} MMK</p>
          <p class="newprice"> ${discountedPrice} </p>
          <p class="off"> ( ${value.pDiscount}% off )</p>
       </div>
      </div> 
       `;
    } 
  
  }
// type of gender
  function genderStatus(gender) {
    return gender==1 ? 'M' :'F'; 
  }
  //color for different gender
  function gendercolor(gender) {
    return gender==1 ? 'male' :'female'; 
  }

  function sizecheck(size) {  
    return size ?  '' : 'opacity05' ;
  }
  // function for color items
  function color(array) {
    let colors='';
    for (let i = 0; i < array.length; i++) {
     colors +=` <p class="color" style="background-color:${array[i]}">  </p>` 
    } 
    return colors;
  }

// function for calculate discount
  function calculateDiscountedPrice(originalPrice, discountPercentage) {
   
    // Calculate discounted price
    const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
  
    return discountedPrice==0 ? "FREE" : discountedPrice + " MMK";
   
  }

 

  

  