## 자동 생성

컴파일러는 `#[derive]` [속성][속성]을 통해 일부 트레이트에 대한 기본 구현을 제공할 수 있습니다. 더 복잡한 동작이 필요한 경우 트레이트를 수동으로 구현할 수 있습니다.

다음은 자동 생성 가능한 트레이트 목록입니다.
* 비교 트레이트:
  [`Eq`][eq], [`PartialEq`][partial-eq], [`Ord`][ord], [`PartialOrd`][partial-ord].
* [`Clone`][clone], `&T`에서 `T`를 복사하여 생성합니다.
* [`Copy`][copy], '복사 세만틱스' 대신 '이동 세만틱스'를 가진 유형을 제공합니다.
* [`Hash`][hash], `&T`에서 해시를 계산합니다.
* [`Default`][default], 데이터 유형의 빈 인스턴스를 생성합니다.
* [`Debug`][debug], `{:?}` 형식을 사용하여 값을 형식화합니다.

```rust,editable
// `Centimeters`, 비교 가능한 튜플 구조체
#[derive(PartialEq, PartialOrd)]
struct Centimeters(f64);

// `Inches`, 출력 가능한 튜플 구조체
#[derive(Debug)]
struct Inches(i32);

impl Inches {
    fn to_centimeters(&self) -> Centimeters {
        let &Inches(inches) = self;

        Centimeters(inches as f64 * 2.54)
    }
}

// `Seconds`, 추가 속성이 없는 튜플 구조체
struct Seconds(i32);

fn main() {
    let _one_second = Seconds(1);

    // 오류: `Seconds`는 출력되지 않습니다. `Debug` 트레이트를 구현하지 않았습니다
    //println!("One second looks like: {:?}", _one_second);
    // TODO ^ 이 줄을 주석 해제해 보세요

    // 오류: `Seconds`는 비교할 수 없습니다. `PartialEq` 트레이트를 구현하지 않았습니다
    //let _this_is_true = (_one_second == _one_second);
    // TODO ^ 이 줄을 주석 해제해 보세요

    let foot = Inches(12);

    println!("One foot equals {:?}", foot);

    let meter = Centimeters(100.0);

    let cmp =
        if foot.to_centimeters() < meter {
            "smaller"
        } else {
            "bigger"
        };

    println!("One foot is {} than one meter.", cmp);
}
```

### 참조:
[`derive`][derive]

[속성]: ../attribute.md
[eq]: https://doc.rust-lang.org/std/cmp/trait.Eq.html
[partial-eq]: https://doc.rust-lang.org/std/cmp/trait.PartialEq.html
[ord]: https://doc.rust-lang.org/std/cmp/trait.Ord.html
[partial-ord]: https://doc.rust-lang.org/std/cmp/trait.PartialOrd.html
[clone]: https://doc.rust-lang.org/std/clone/trait.Clone.html
[copy]: https://doc.rust-lang.org/core/marker/trait.Copy.html
[hash]: https://doc.rust-lang.org/std/hash/trait.Hash.html
[default]: https://doc.rust-lang.org/std/default/trait.Default.html
[debug]: https://doc.rust-lang.org/std/fmt/trait.Debug.html
[derive]: https://doc.rust-lang.org/reference/attributes.html#derive
