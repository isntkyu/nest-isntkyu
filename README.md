>>>NestJS와 typeORM을 공부합니다.

ZeroCho 님의 슬랙 클론 코딩 풀스택 리포지토리를 fork 해서 

express로 구성된 백엔드 코드를 nestjs로 바꿔봅니다


* 2/16

  * nest 세팅, 구조파악  공식문서 열람

* 2/17

  * dotenv 셋팅 
  * console.log() -> 미들웨어 구현하여 logger 사용 
    * implements 를 하면 구현이 반드시 이루어져야함
    * DI provider - @injectable()

* 2/19
  
  * 모듈 , 컨트롤러 생성
  * https://velog.io/@isntkyu/NestJS 정리


  @Post('logout')
    logOut(@Req() req, @Res() res) {
        req.logOut();
        res.clearCookie('connect.sid', {httpOnly: true});
        res.send('ok');
    }

    컨트롤러는 위처럼 req, res 정보를 모르는게 낫다 그래야 테스트가 편하다
    의존성주입, 결합성때문에 방해가됨 
    그리고 익스프레스에 의존적인 것들은 나중에 방해가 될 수 있따 
    서비스는 아예몰라야된다
    로그아웃같은경우는 예외긴하다.
    아무튼 컨트롤러에서는 최대한 안쓰는게 좋다 유저정보는 예외가 잇을수잇음

- user dto 개발중

인터페이스(export default)는 컴파일이 끝나면 런타임에서는 날아가는데 class를 사용하면 자바스크립트 단에서도 밸리데이션등의 작업을 수행할 수 있게 남아있다. (밸리데이션 라이브러리나 스웨거 사용도 가능) 상속도 가능



api 변수명등을 신중해야하는게 한번 공개된거는 고치기 힘들다
사용자들의 편의를 무시하며 고쳐야하기 때문
예를 들어 자바스크립트의 typeof null === 'object'
이런거도 20년째 고쳐지지 못한다. 공개된채로 사용중이기 떄문
기존거를 사용하는 사람들을 고려해서 api 를 만들어야한다
반례) 파이썬은 파이선2와 파이선3 쓰는 사람 나눠지게됨

* 2/20

  * API 스웨거생성 
  * 데코레이터 커스텀