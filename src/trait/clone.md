## Clone

자원을 다룰 때, 기본적인 동작은 할당이나 함수 호출 중에 자원을 이동하는 것입니다. 그러나 때때로 자원의 복사본을 만들어야 할 수도 있습니다.

[`Clone`][clone] 트레이트는 이를 정확히 해주는 데 도움이 됩니다. 가장 일반적으로는 `Clone` 트레이트에서 정의된 `.clone()` 메서드를 사용할 수 있습니다.

```rust,editable
// 자원이 없는 단위 구조체
#[derive(Debug, Clone, Copy)]
struct Unit;

// 자원을 가진 튜플 구조체가 `Clone` 트레이트를 구현
#[derive(Clone, Debug)]
struct Pair(Box<i32>, Box<i32>);

fn main() {
    // `Unit` 인스턴스 생성
    let unit = Unit;
    // `Unit` 복사, 자원이 없으므로 이동하지 않음
    let copied_unit = unit;

    // 두 `Unit` 모두 독립적으로 사용 가능
    println!("original: {:?}", unit);
    println!("copy: {:?}", copied_unit);

    // `Pair` 인스턴스 생성
    let pair = Pair(Box::new(1), Box::new(2));
    println!("original: {:?}", pair);

    // `pair`를 `moved_pair`로 이동, 자원이 이동됨
    let moved_pair = pair;
    println!("moved: {:?}", moved_pair);

    // 오류! `pair`는 자원을 잃음
    //println!("original: {:?}", pair);
    // TODO ^ 해제된 코드를 주석 해제해보세요

    // `moved_pair`를 복사하여 `cloned_pair`에 저장 (자원 포함)
    let cloned_pair = moved_pair.clone();
    // `std::mem::drop`를 사용하여 `moved_pair` 원본을 삭제
    drop(moved_pair);

    // 오류! `moved_pair`가 삭제됨
    //println!("moved and dropped: {:?}", moved_pair);
    // TODO ^ 해제된 코드를 주석 해제해보세요

    // `.clone()`의 결과는 여전히 사용 가능!
    println!("clone: {:?}", cloned_pair);
}
```

[clone]: https://doc.rust-lang.org/std/clone/trait.Clone.html
