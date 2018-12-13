import {Injectable} from '@angular/core';

@Injectable()
export class BaUtilString {
    public EMPTY: string = '';
	public SPACE: string = ' ';
	public POINT: string = '.';
	public POINT_NO_REGEX: string = '\\.';
	public SLASH: string = '/';
	public BACKSLASH: string  = '\\';
	public UNDERSCORE: string = '_';
    public HYPHEN: string  = '-';
	public COLON: string = ':';
	public SEMICOLON: String = ';';
	public DOUBLE_SLASH: string = '//';
	public EQUAL: string = '=';
	public OPEN_PARENTHESIS: string = '(';
	public CLOSE_PARENTHESIS: string = ')';

    constructor(){}
    public isNullOrEmpty(str: string): boolean {
        return str === undefined || str.length === 0;
    }
    public concatenate(...args: string[]): string {
        let result: String = new String('');
        args.forEach(str => {
            result = result.concat(str);
        });
        return result.toString();
    }
    public subString(str: string, start:number, end?: number): string {
        return !this.isNullOrEmpty(str)? str.substring(start,end): undefined;
    }
    public split(str: string, separator: string, limit?: number): string[]{
        return !this.isNullOrEmpty(str)? str.split(separator,limit) : undefined;
    }
}