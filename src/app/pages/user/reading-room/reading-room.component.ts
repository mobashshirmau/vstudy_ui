import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throws } from 'assert';
import { StudyMaterialService } from 'src/app/services/study-material.service';

@Component({
  selector: 'app-reading-room',
  templateUrl: './reading-room.component.html',
  styleUrls: ['./reading-room.component.css']
})
export class ReadingRoomComponent implements OnInit {
  urll;
  allChapter;
  subj
  cls
  contentData
  chapter
  docUrl;
  currentChapter;
  constructor(private _route: ActivatedRoute,private _sm:StudyMaterialService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.subj = params.s;
      localStorage.setItem('subject',this.subj);
      this.cls = localStorage.getItem('class');
      this._sm.getAllChapter(this.cls,this.subj).subscribe(
        (result: any) => {
            this.allChapter = result;
            this.currentChapter = Object.keys(this.allChapter)[0]
            var defaultLoadChapterPath = Object.values(this.allChapter)[0]
          
            this.docUrl=`https://vstudy.in/portal/portal-assets/study-material/${defaultLoadChapterPath}`;
            
            
          },
        (error) => {
          console.log(error);
          alert('error in loading Subject');
        });
    });

  }
  loadNgxDocUrl(data,chapt){
    this.currentChapter=chapt;
    this.docUrl=`https://vstudy.in/portal/portal-assets/study-material/${data}`;
    console.log(this.docUrl);
  }
  contentLoaded() {
    document.getElementById("progressBar").style.display = "none";
}
}
