import { Component,    } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {IntroductionPage} from "../introduction/introduction"

import 'fabric';
import { text } from '@angular/core/src/render3/instructions';
declare const fabric: any;

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {

  private canvas: any;
  canvasElement ;
  private props: any = {
    canvasFill: '#ffffff',
    canvasImage: '',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: null,
    TextDecoration: ''
  };


  private textString: string;
  private url: string = '';
  private size: any = {
    width: 500,
    height: 300
  };

  private json: any;
  private globalEditor: boolean = false;
  private textEditor: boolean = false;
  private imageEditor: boolean = false;
  private figureEditor: boolean = false;
  private selected: any;


  changeBackGroundColor = [{
    card: {
      'display': 'flex',
      'height': '50px',
      'width': '50px',
      'background-color': '#a9eec2',
      'border-radius': '10px',
      ' box-shadow': ' -1rem 0 3rem #000',
      'transition': ' 0.4s ease-out',
      'position': 'relative ',
      'left': '0px'

    },


  },
  {
    card: {
      'display': 'flex',
      'height': '50px',
      'width': '50px',
      'background-color': '#ff7a8a',
      'border-radius': '10px',
      ' box-shadow': ' -1rem 0 3rem #000',
      'transition': ' 0.4s ease-out',
      'position': 'relative ',
      'left': '0px'

    },


  },

  {
    card: {
      'display': 'flex',
      'height': '50px',
      'width': '50px',
      'background-color': '#ff7a8a',
      'border-radius': '10px',
      ' box-shadow': ' -1rem 0 3rem #000',
      'transition': ' 0.4s ease-out',
      'position': 'relative ',
      'left': '0px'

    },


  },

  {
    card: {
      'display': 'flex',
      'height': '50px',
      'width': '50px',
      'background-color': '#ff7a8a',
      'border-radius': '10px',
      ' box-shadow': ' -1rem 0 3rem #000',
      'transition': ' 0.4s ease-out',
      'position': 'relative ',
      'left': '0px'

    },


  }


  ]

  unicode = ['&#x1F60D' ,"&#x1F618" , "&#x1F48B" , "&#x1F496 " , "&#x1F338", "&#x1F339", "U+1F942" ,  "&#x1F942"];

  temunicode = [] ;

  colorbackgroundColor= ["#ca5fa6" ,"#f36886" , "#fa8282" , "#ffaf65" , "#17223b" , "#263859" , "#ff9776"]

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    
    for (let index = 0; index < this.unicode.length; index++) {
 
      let a = parseInt(this.unicode[index])
    
      this.temunicode.push(a);
    
      console.log(this.temunicode);
      
    }
     
  
  }

  ngOnInit(){

   
  
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'red'
    });
    
   this.canvas.setWidth(this.size.width);
   this.canvas.setHeight(this.size.height);

  
   var randomItem = this.colorbackgroundColor[Math.floor(Math.random()* this.colorbackgroundColor.length)];

   this.canvas.backgroundColor = randomItem
  
   this.addText()
   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }



  addImageOnCanvas(url) {
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornersize: 10,
          hasRotatingPoint: true
        });
        image.setWidth(200);
        image.setHeight(200);
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }


  extend(obj, id) {
    obj.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: id
        });
      };
    })(obj.toObject);
  }



  selectItemAfterAdded(obj) {
    this.canvas.deactivateAllWithDispatch().renderAll();
    this.canvas.setActiveObject(obj);
  }


  getImgPolaroid(event: any) {
    let el = event.target;
    fabric.Image.fromURL(el.src, (image) => {
      image.set({
        left: 10,
        top: 10,
        angle: 0,
        padding: 10,
        width:250 ,
        height:150 ,
        cornersize: 10,
        hasRotatingPoint: true,
        peloas: 12
      });
      
      this.extend(image, this.randomId());
      this.canvas.add(image);
      this.selectItemAfterAdded(image);
    });
  }
  setCanvasFill(i) {
    console.log(this.changeBackGroundColor[i].card["background-color"])
   
    if (!this.props.canvasImage) {
      console.log(this.props.canvasFill)
      this.canvas.backgroundColor = this.changeBackGroundColor[i].card["background-color"];
      this.canvas.renderAll();
    }
  }


 

  t1 ;
  addText() {
    let textString = this.textString;
   
    this.t1 = new fabric.Textbox( " Type your message here ", {
      width: 150,
      top: 150,
      left: 70,
       
      fontSize: 16,
      shadow: 'rgba(0,0,0,0.2) 0 0 5px' ,
      //fontWeight: 'bold' ,
      fontFamily: 'Delicious' ,
      color:"white" ,
      fontStyle: 'italic',
  
      lineHeight: 1 ,
      textAlign: 'center',
      fixedWidth: 150
  });
  
  this.canvas.on('text:changed', function(opt) {
    var t1 = opt.target;
    if (t1.width > t1.fixedWidth) {
      t1.fontSize *= t1.fixedWidth / (t1.width + 1);
      t1.width = t1.fixedWidth;
    }
  });
  
 
  this.canvas.add(this.t1).setActiveObject(this.t1);

  this.t1.fill = "#ffff"

  }

  setActiveStyle(styleName, value, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return;

    if (object.setSelectionStyles && object.isEditing) {
      var style = {};
      style[styleName] = value;
      object.setSelectionStyles(style);
      object.setCoords();
    }
    else {
      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }



  



  

track= 0 ;
  setText() {
    console.log("clicked fill");
    var fontWeight = ["bold" , " bolder" ,'lighter' , "normal"];

    this.t1.set({fontWeight: fontWeight[this.track]})
    this.track +=1 ;
    this.canvas.renderAll();
  }

  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
  }



  
   

   



   
}
