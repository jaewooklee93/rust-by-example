## 연관된 유형

"연관된 유형"의 사용은 코드의 전체적인 읽기 쉬움을 향상시키며, 내부 유형을 trait로서 *출력* 유형으로 이동합니다. `trait` 정의의 문법은 다음과 같습니다.

```rust
// `A`와 `B`는 `trait` 내에서 `type` 키워드를 통해 정의됩니다.
// (참고: 이 맥락에서 `type`는 `type`를 사용하여 별칭을 만드는 것과 다릅니다).
trait Contains {
    type A;
    type B;

    // 이러한 새로운 유형을 일반적으로 참조하는 데 사용되는 업데이트된 문법.
    fn contains(&self, _: &Self::A, _: &Self::B) -> bool;
}
```

`trait` `Contains`를 사용하는 함수는 `A` 또는 `B`를 전혀 표현할 필요가 없다는 점에 유의하세요.

```rust,ignore
// 연관된 유형을 사용하지 않고
fn difference<A, B, C>(container: &C) -> i32 where
    C: Contains<A, B> { ... }

// 연관된 유형을 사용하여
fn difference<C: Contains>(container: &C) -> i32 { ... }
```

이전 섹션의 예제를 연관된 유형을 사용하여 다시 작성해 보겠습니다.

```rust,editable
struct Container(i32, i32);

// 컨테이너 안에 2개의 항목이 저장되어 있는지 확인하는 trait.
// 또한 첫 번째 또는 마지막 값을 가져옵니다.
trait Contains {
    // 여기에서 메서드가 사용할 수 있는 일반 유형을 정의합니다.
    type A;
    type B;

    fn contains(&self, _: &Self::A, _: &Self::B) -> bool;
    fn first(&self) -> i32;
    fn last(&self) -> i32;
}

impl Contains for Container {
    // `A`와 `B` 유형이 무엇인지 지정합니다. `input` 유형이 `Container(i32, i32)`이면, `output` 유형은 `i32`와 `i32`로 결정됩니다.
    type A = i32;
    type B = i32;

    // `&Self::A`와 `&Self::B`도 여기에서 유효합니다.
    fn contains(&self, number_1: &i32, number_2: &i32) -> bool {
        (&self.0 == number_1) && (&self.1 == number_2)
    }
    // 첫 번째 숫자를 가져옵니다.
    fn first(&self) -> i32 { self.0 }

    // 마지막 숫자를 가져옵니다.
    fn last(&self) -> i32 { self.1 }
}

fn difference<C: Contains>(container: &C) -> i32 {
    container.last() - container.first()
}

fn main() {
    let number_1 = 3;
    let number_2 = 10;

    let container = Container(number_1, number_2);

    println!("컨테이너에 {}과 {}이 포함되어 있나요: {}",
        &number_1, &number_2,
        container.contains(&number_1, &number_2));
    println!("첫 번째 숫자: {}", container.first());
    println!("마지막 숫자: {}", container.last());
    
    println!("차이: {}", difference(&container));
}
```
