export interface MessageResponseDto<T> {
    success : boolean;
	error : string;
	message: T;
 }
