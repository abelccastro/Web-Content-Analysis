import {UrlDto} from './index'

export class GenerateAnalysisDto  {
     callback:string;
     sites: string[];
     constructor(){
         this.sites = [];
     }
}