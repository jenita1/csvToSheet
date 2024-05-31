import { Component } from '@angular/core';
import * as XLSX from 'xlsx'
import { Router } from '@angular/router';


@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.css'
})
export class SheetComponent {
  public tabData:any;
  public tabTitle:any;
  public pagination =1;
  public recordPerPage =20;
  public tabRecords =[];
  public pageStartCount =0;
  public pageEndCount =10;
  public totalPageCount =0;
  public currentPage =0;
  public uploaded =false;
  constructor(
    private router:Router
  ) { }


  public uploadCsv(e:any) {


    console.log(e.target.files[0]);
    //reading file
    const target: DataTransfer = <DataTransfer>(<unknown>event?.target);
    if(target.files.length !== 1){
      throw new Error ("Sorry cant upload multiple files")
    }
    this.uploaded=true;
     
    const reader: FileReader =new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload =(e:any)=>{
      const  binarystr :string =e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, {type:'binary'});

      const wsname: string =wb.SheetNames[0];
      const ws:XLSX.WorkSheet =wb.Sheets[wsname];

      //save data
      const data =XLSX.utils.sheet_to_json(ws)
      console.log(data);
      this.tabData =data;
      this.tabTitle = Object.keys(this.tabData[0]);
      this.tabRecords = this.tabData.slice(
        this.pageStartCount,
        this.pageEndCount
      );
      this.totalPageCount =this.tabData.length / this.recordPerPage;
    };
  }
  // onChange(){
  //   this.pageStartCount =this.currentPage * this.recordPerPage;
  //   this.pageEndCount =this.pageStartCount + this.recordPerPage;
  //   this.tabRecords = this.tabData.slice(
  //     this.pageStartCount
  //   )
  // }





}
