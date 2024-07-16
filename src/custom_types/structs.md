## 구조체

`struct` 키워드를 사용하여 만들 수 있는 구조체(구조체라고도 함)의 유형은 세 가지입니다.

* 튜플 구조체, 즉 이름이 붙은 튜플입니다.
* 고전적인 [C 구조체][c_struct]
* 필드가 없는 단위 구조체, 제네릭에 유용합니다.

```rust,editable
// 사용되지 않는 코드에 대한 경고를 숨기는 속성
#![allow(dead_code)]

#[derive(Debug)]
struct Person {
    name: String,
    age: u8,
}

// 단위 구조체
struct Unit;

// 튜플 구조체
struct Pair(i32, f32);

// 두 필드를 가진 구조체
struct Point {
    x: f32,
    y: f32,
}

// 다른 구조체의 필드로 구조체를 재사용할 수 있습니다.
struct Rectangle {
    // 좌상단과 우하단의 위치를 통해 직사각형을 지정할 수 있습니다.
    top_left: Point,
    bottom_right: Point,
}

fn main() {
    // 필드 초기화 간략 표현을 사용하여 구조체를 생성합니다.
    let name = String::from("Peter");
    let age = 27;
    let peter = Person { name, age };

    // 디버그 구조체를 출력합니다.
    println!("{:?}", peter);

    // `Point`를 인스턴스화합니다.
    let point: Point = Point { x: 10.3, y: 0.4 };
    let another_point: Point = Point { x: 5.2, y: 0.2 };

    // `point`의 필드에 액세스합니다.
    println!("point 좌표: ({}, {})", point.x, point.y);

    // 다른 구조체의 필드를 사용하여 새로운 `Point`를 만듭니다.
    let bottom_right = Point { x: 5.2, ..another_point };

    // `bottom_right.y`는 `another_point.y`와 같습니다. `another_point`의 해당 필드를 사용했기 때문입니다.
    println!("두 번째 점: ({}, {})", bottom_right.x, bottom_right.y);

    // `let` 바인딩을 사용하여 `point`를 해체합니다.
    let Point { x: left_edge, y: top_edge } = point;

    let _rectangle = Rectangle {
        // 구조체 인스턴스화도 표현입니다.
        top_left: Point { x: left_edge, y: top_edge },
        bottom_right: bottom_right,
    };

    // 단위 구조체를 인스턴스화합니다.
    let _unit = Unit;

    // 튜플 구조체를 인스턴스화합니다.
    let pair = Pair(1, 0.1);

    // 튜플 구조체의 필드에 액세스합니다.
    println!("pair에는 {:?}와 {:?}이 포함되어 있습니다", pair.0, pair.1);

    // 튜플 구조체를 해체합니다.
    let Pair(integer, decimal) = pair;

    println!("pair에는 {:?}와 {:?}이 포함되어 있습니다", integer, decimal);
}
```

### 활동

1. `rect_area` 함수를 추가하여 `Rectangle`의 면적을 계산합니다(중첩 해체를 사용해 보세요).
2. `square` 함수를 추가하여 `Point`와 `f32`를 인수로 받고, 지정된 점에 좌상단을 갖고, `f32`에 해당하는 너비와 높이를 가진 `Rectangle`을 반환합니다.

### 참조

[`속성`][속성], [원시 식별자][원시_식별자] 및 [해체][해체]

[속성]: ../attribute.md
[c_struct]: https://ko.wikipedia.org/wiki/구조체_(C_프로그래밍_언어)
[해체]: ../flow_control/match/destructuring.md
[원시_식별자]: ../compatibility/raw_identifiers.md
