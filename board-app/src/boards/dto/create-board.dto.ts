// DTO :(data transfer object) 계층간 데이터 교환을 위한 객체
// - 1. 데이터 유효성 체크하는데 효율적 2. 코드 안정성
// - db에서 데이터를 얻어 service 나 controller 등으로 보낼 때 사용하는 객체
// - DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체
// - interface 나 class 를 이용해서 정의 가능. 
// - class가 더 선호됨: class는 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할 때 더 유용 (typescript interface 는 트랜스 파일 중에 제거되므로 nest는 런타임에서 참조 할 수 없음.)

export class CreateBoardDto{
    title: string;
    content: string;
}
