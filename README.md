>>>NestJS와 typeORM을 공부합니다. 

  

>> 후에 복습후 블로그에 정리

ZeroCho 님의 슬랙 클론 코딩 풀스택 리포지토리를 fork 해서 

express로 구성된 백엔드 코드를 nestjs로 바꿔봅니다

---

* 2/16

  * nest 세팅, 구조파악  공식문서 열람

---

* 2/17

  * dotenv 셋팅 
  * console.log() -> 미들웨어 구현하여 logger 사용 
    * implements 를 하면 구현이 반드시 이루어져야함
    * DI provider - @injectable()

---
* 2/19
  
  * 모듈 , 컨트롤러 생성
  * https://velog.io/@isntkyu/NestJS 정리

    ```js
    @Post('logout')
    logOut(@Req() req, @Res() res) {
        req.logOut();
        res.clearCookie('connect.sid', {httpOnly: true});
        res.send('ok');
    }
    ```
    
    컨트롤러는 위처럼 req, res 정보를 모르는게 낫다 그래야 테스트가 편하다  
    의존성주입, 결합성때문에 방해가됨  
    그리고 익스프레스에 의존적인 것들은 나중에 방해가 될 수 있따 
    서비스는 아예몰라야된다  
    로그아웃같은경우는 예외긴하다.  
    아무튼 컨트롤러에서는 최대한 안쓰는게 좋다 유저정보는 예외가 잇을수잇음  

- user dto 개발중

인터페이스(export default)는 컴파일이 끝나면 런타임에서는 날아가는데 class를 사용하면 자바스크립트 단에서도 밸리데이션등의 작업을 수행할 수 있게 남아있다.
(밸리데이션 라이브러리나 스웨거 사용도 가능) 상속도 가능



api 변수명등을 신중해야하는게 한번 공개된거는 고치기 힘들다
사용자들의 편의를 무시하며 고쳐야하기 때문
예를 들어 자바스크립트의 typeof null === 'object'
이런거도 20년째 고쳐지지 못한다. 공개된채로 사용중이기 떄문
기존거를 사용하는 사람들을 고려해서 api 를 만들어야한다
반례) 파이썬은 파이선2와 파이선3 쓰는 사람 나눠지게됨

---
* 2/20

  * API 스웨거생성 
  * 데코레이터 커스텀
  * interceptor 사용

---
* 2/21

  https://rxjs.dev/api/index/const/asyncScheduler

`AOP`(인터셉터가 aop역할)

DI 결합성을 낮추면 테스트나 재사용하기가 편함

초보한텐 네스트가 좋을수잇음 

`npm i typeorm-model-generator -D`  DB를 그대로 타입스크립트 엔터티로 가져올 수 잇다

many to many 버그생기면 many to one to many
https://www.erdcloud.com/

fotRoot = 설정이 붙은애들 ( =레지스터)

---

* 2/22

 db -> typeorm   제너레이터
 typeorm -> db   synchronize: true, (ormconfig) 한번만 트루 해야함
 synchronize: true 하는게 싫으면 
 
 - npm run 
   - "schema:drop": "ts-node ./node_modules/typeorm/cli.js schema:drop",
   - "schema:sync": "ts-node ./node_modules/typeorm/cli.js schema:sync",

  * type-seeding  초기데이터 (팩토리로 가짜데이터 삽입할수잇음)


  마이그레이션


    "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js",
      ormconfig.ts 도 읽을 수 있게
    "db:create-migration": "npm run typeorm migration:create -- -n",
    "db:generate-migration": "npm run typeorm migration:generate -- -n"


    DI reposit 하는법

    async 함수에서는 throw 해도 서버 안죽고 200응답
    프로미스안에서는 경고로 뜸

---
* 2.23
  - HttpException

  import { bcrypt } from 'bcrypt';
  import * as bcrypt from 'bcrypt';.
  commonjs랑 es module의 차이점 때문입니다. commonjs에는 default가 없습니다

---
* 2.24

  * class-validator
     - 데코레이터 를 dto 위에 붙여서 사용 

---
* 2.25, 2.26
  * @nestjs/passport

  @UseGuards  주로 권한 처리 401 403 (인터셉터보다 먼저실행)

서비스 안에서는 레포지토리를쓴다 (컨트롤러에선 서비스만 쓰고)
서비스 안에 서비스 쓰면 나중에 가짜객체 모킹을 할떄 테스트가 불편해진다.
계층을 나누는게 편할듯


strategy 에서 done 되면
-> req login 으로 간다음 (await super.logIn(request);)
-> serializeUser 로 감

모듈의 메타데이터 남의 모듈 -> 임포트, 프로바이더 => 인젝터블


app.module 에는 모든 모듈이 연결되어있어야하는데
a > b > c 일떄는 c 를 굳이 넣어야한다는 말은아님

* relations / join

relations: ['Workspaces'] 
<img width="548" alt="스크린샷 2022-02-27 오후 8 36 07" src="https://user-images.githubusercontent.com/56504493/155880814-ea810786-88d9-447a-9dff-e5f2008330e0.png">
이 Workspaces 를 매칭

join 을 쓸 수도 잇음

---

* 2/27

 typeOrm - 쿼리를 날리는 메소드에서는 즉 db 연동 하는 부분에서는 에러 catch 해주기

---
 
* 3/1

  @인젝션하면 @모듈에 import에 넣어주기 

  데이터 매퍼 패턴

```js

//중간테이블 사용 장단점
        //방법1
        const workspaceMember = this.workspaceMembersRepository.create();
        workspaceMember.UserId = returned.id;
        workspaceMember.WorkspaceId = 1;
        //방법2
        await this.channelMembersRepository.save({ //data mapper
            UserId: returned.id,
            ChannelId: 1
        })

```

방법 1은 서비스내에서 if문 for 문 등 다양하게 활용가능한 장점

    * typeorm Transaction  방법 다양함
      https://orkhan.gitbook.io/typeorm/docs/transactions 여기서 정리
      공식문서에서는 쿼리러너 추천


    * 라이브러리에서 그대로 가져오는 것 Nest 에서는 피해야할 패턴 (DI)
    
 ex)
 ```js
 const queryRunner = getConnection().createQueryRunner();
 queryRunner.connect();
 ```


 ```js
 constructor(private connection: Connection,)
 
 
 const queryRunner = this.connection().createQueryRunner();
 queryRunner.connect();
 ```

    테스트용 커넥션으루 후에 대체 가능해서 좋다 .


    * queryRunner.manager.getRepository()
      * 쿼리러너로 레포지토리를 불러와야한 트랜잭션 커넥션에 묶임 

* 3/2
  * 클래스를 상속받아서 쓸때는  DI가 잘 안되는 경우가 있는데 이때는
    constructor 바깥에 @Inject 를 한다 (기본적으로는 constructor 안에 인젝션하는걸 권장)

  * find({where: {id}, take: 1}); take == limit

  * (@Param('myId', ParseIntPipe) myId: number) // 자바스크립트에서는 스트링으로 다루기때문에 파라미터를, ParseIntPipe

  * nest DTO 장점 valiation, swagger(문서화), 타입지정

* 3/3 절친 생일
  * typeorm 쿼리빌더
  * Active Record
  * Data Mapper
  * QueryBuilder

* 3/5
  *  'w.url = :url', {url: url}); typrorm이 sql 인젝션 방어햊둠
  `w.url = ${url}`);  이 방식은 sql 인젝션 때문에 위험함 

  * 


* 3/9

  * nest 내장 웹소켓 - 게이트웨이(프로바이더임)
  * socket.io도 passport처럼 네스트식으로 감싸서 사용
  * namespace(regex) >> room

  * implements 하면 그 안의 함수들을 의무적으로 구현해야하기 때문에 검사용도로 사용도 가능.

  * providers 에 넣으면 안되고 import EventsModule 로 해야한다.



* 3/14

  * file upload multer @UseInterceptors(FileInterceptor) FileInterceptor 가 multer의 어레이 싱글 등에 대응.

* 3/16
  * multer
  * 공식문서 server static ;

  * (사진)
  위와 같은 빨간줄 뜨는건 저 메서드가 익스프레스인지 패스티파이 인지 네스트는모르기때문
  둘중 한쪽에만 잇는 메소드일수 잇음
  - 해결법
  *  import { NestExpressApplication } from '@nestjs/platform-express';
  *  const app = await NestFactory.create<NestExpressApplication>(AppModule);


* 3/17
  * 빌드시 윈도우면 `cross-env` 사용 NODE_ENV=
  * 리눅스나 맥에서는 80 포트쓰려면 sudo 붙이기
  * pm2 사용 배포
  * 메모리 사용문제로 로컬에서 빌드(nest 빌드)해서 dist 파일을 git으로 옮겨서 서버에서 사용해도됨