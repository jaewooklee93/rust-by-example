## Box, 스택 및 힙

Rust에서 모든 값은 기본적으로 스택에 할당됩니다. 값을 *박스*로 할당(힙에 할당)하려면 `Box<T>`를 생성합니다. 박스는 `T` 유형의 힙에 할당된 값에 대한 스마트 포인터입니다. 박스가 범위를 벗어나면 소멸자를 호출하고 내부 객체가 파괴되며 힙에 있는 메모리가 해제됩니다.

박스 값은 `*` 연산자를 사용하여 해제할 수 있습니다. 이는 인디렉션의 한 층을 제거합니다.

```rust,editable
use std::mem;

#[allow(dead_code)]
#[derive(Debug, Clone, Copy)]
struct Point {
    x: f64,
    y: f64,
}

// 직사각형은 좌측 상단과 우측 하단의 모서리가 공간에서 어디에 있는지로 지정할 수 있습니다
#[allow(dead_code)]
struct Rectangle {
    top_left: Point,
    bottom_right: Point,
}

fn origin() -> Point {
    Point { x: 0.0, y: 0.0 }
}

fn boxed_origin() -> Box<Point> {
    // 힙에 이 점을 할당하고, 그에 대한 포인터를 반환합니다
    Box::new(Point { x: 0.0, y: 0.0 })
}

fn main() {
    // (모든 타입 어노테이션은 불필요합니다)
    // 스택에 할당된 변수
    let point: Point = origin();
    let rectangle: Rectangle = Rectangle {
        top_left: origin(),
        bottom_right: Point { x: 3.0, y: -4.0 }
    };

    // 힙에 할당된 직사각형
    let boxed_rectangle: Box<Rectangle> = Box::new(Rectangle {
        top_left: origin(),
        bottom_right: Point { x: 3.0, y: -4.0 },
    });

    // 함수의 출력은 박스로 할당될 수 있습니다
    let boxed_point: Box<Point> = Box::new(origin());

    // 중첩된 인디렉션
    let box_in_a_box: Box<Box<Point>> = Box::new(boxed_origin());

    println!("Point occupies {} bytes on the stack",
             mem::size_of_val(&point));
    println!("Rectangle occupies {} bytes on the stack",
             mem::size_of_val(&rectangle));

    // 박스 크기 == 포인터 크기
    println!("Boxed point occupies {} bytes on the stack",
             mem::size_of_val(&boxed_point));
    println!("Boxed rectangle occupies {} bytes on the stack",
             mem::size_of_val(&boxed_rectangle));
    println!("Boxed box occupies {} bytes on the stack",
             mem::size_of_val(&box_in_a_box));

    // `boxed_point`에 포함된 데이터를 `unboxed_point`로 복사합니다
    let unboxed_point: Point = *boxed_point;
    println!("Unboxed point occupies {} bytes on the stack",
             mem::size_of_val(&unboxed_point));
}
```
