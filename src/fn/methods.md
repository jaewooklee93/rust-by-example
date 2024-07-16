## 연관 함수 및 메서드

일부 함수는 특정 유형에 연결됩니다. 이러한 함수는 두 가지 형태로 나타납니다.
연관 함수와 메서드입니다. 연관 함수는 유형에 일반적으로 정의되는 함수이며, 메서드는 특정 유형의 인스턴스에 호출되는 연관 함수입니다.

```rust,editable
struct Point {
    x: f64,
    y: f64,
}

// 구현 블록, 모든 `Point` 연관 함수 및 메서드가 여기에 들어갑니다
impl Point {
    // 이것은 유형과 관련된 "연관 함수"입니다.
    // 이 함수는 `Point`라는 특정 유형과 관련되어 있습니다.
    // 연관 함수는 인스턴스를 호출할 필요가 없습니다.
    // 이러한 함수는 일반적으로 생성자와 같이 사용됩니다.
    fn origin() -> Point {
        Point { x: 0.0, y: 0.0 }
    }

    // 두 개의 인수를 받는 또 다른 연관 함수:
    fn new(x: f64, y: f64) -> Point {
        Point { x: x, y: y }
    }
}

struct Rectangle {
    p1: Point,
    p2: Point,
}

impl Rectangle {
    // 이것은 메서드입니다.
    // `&self`는 `self: &Self`의 간소화된 형태이며, `Self`는 호출 객체의 유형입니다.
    // 이 경우 `Self` = `Rectangle`입니다.
    fn area(&self) -> f64 {
        // `self`는 점표 연산자를 통해 구조체 필드에 액세스할 수 있습니다.
        let Point { x: x1, y: y1 } = self.p1;
        let Point { x: x2, y: y2 } = self.p2;

        // `abs`는 호출자의 절댓값을 반환하는 `f64` 메서드입니다.
        ((x1 - x2) * (y1 - y2)).abs()
    }

    fn perimeter(&self) -> f64 {
        let Point { x: x1, y: y1 } = self.p1;
        let Point { x: x2, y: y2 } = self.p2;

        2.0 * ((x1 - x2).abs() + (y1 - y2).abs())
    }

    // 이 메서드는 호출 객체가 변경 가능해야 합니다.
    // `&mut self`는 `self: &mut Self`로 간소화됩니다.
    fn translate(&mut self, x: f64, y: f64) {
        self.p1.x += x;
        self.p2.x += x;

        self.p1.y += y;
        self.p2.y += y;
    }
}

// `Pair`는 리소스를 소유합니다: 두 개의 힙 할당된 정수
struct Pair(Box<i32>, Box<i32>);

impl Pair {
    // 이 메서드는 호출 객체의 리소스를 "소비"합니다.
    // `self`는 `self: Self`로 간소화됩니다.
    fn destroy(self) {
        // `self`를 해체합니다.
        let Pair(first, second) = self;

        println!("Destroying Pair({}, {})", first, second);

        // `first`와 `second`는 범위를 벗어나 해제됩니다.
    }
}

fn main() {
    let rectangle = Rectangle {
        // 연관 함수는 두 개의 콜론을 사용하여 호출됩니다.
        p1: Point::origin(),
        p2: Point::new(3.0, 4.0),
    };

    // 메서드는 점표 연산자를 사용하여 호출됩니다.
    // `&self`는 암시적으로 전달되므로 `rectangle.perimeter()` === `Rectangle::perimeter(&rectangle)`입니다.
    println!("Rectangle perimeter: {}", rectangle.perimeter());
    println!("Rectangle area: {}", rectangle.area());

    let mut square = Rectangle {
        p1: Point::origin(),
        p2: Point::new(1.0, 1.0),
    };

    // 오류! `rectangle`은 불변이지만 이 메서드는 변경 가능한 객체를 필요로 합니다.
    //rectangle.translate(1.0, 0.0);
    // TODO ^ 이 줄을 주석 처리 해제하려고 시도해 보세요

    // 괜찮습니다! 변경 가능한 객체는 변경 가능한 메서드를 호출할 수 있습니다.
    square.translate(1.0, 1.0);

    let pair = Pair(Box::new(1), Box::new(2));

    pair.destroy();

    // 오류! 이전 `destroy` 호출이 `pair`를 "소비"했습니다.
    //pair.destroy();
    // TODO ^ 해제하려면 이 줄을 주석 처리 해제하세요
}
```
