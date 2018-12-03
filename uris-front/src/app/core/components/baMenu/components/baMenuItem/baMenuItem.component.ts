import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import 'style-loader!./baMenuItem.scss';

@Component({
  selector: 'ba-menu-item',
  templateUrl: './baMenuItem.html'
})
export class BaMenuItem implements OnInit{

  @Input() menuItem:any;
  @Input() child:boolean = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  public ngOnInit(){
    this.resolverItem();
  }
  public onHoverItem($event):void {
    this.itemHover.emit($event);
  }

  public onToggleSubMenu($event, item):boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }

  public resolverItem() {
    this.menuItem.route.paths.forEach(item => {
      let paths : string[] = item.split('/');
      if(paths.length > 1 && paths[0] !="") {
        let index: number = this.menuItem.route.paths.indexOf(item);
        this.menuItem.route.paths[index] = paths[0];
        for(let i = 1; i < paths.length; i++){
          this.menuItem.route.paths.push(paths[i]);
        }
      }
    });
  }
}
