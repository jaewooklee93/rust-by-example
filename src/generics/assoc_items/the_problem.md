## 문제

컨테이너 유형에 대한 일반화된 `trait`는 유형 지정 요구 사항이 있습니다. `trait`를 사용하는 사용자는 `trait`의 모든 일반 유형을 명시해야 합니다.

아래 예제에서 `Contains` `trait`는 일반 유형 `A`와 `B`를 사용할 수 있습니다. `trait`는 `Container` 유형에 대해 구현되어 `A`와 `B`에 `i32`를 지정하여 `fn difference()`를 사용할 수 있도록 합니다.

`Contains`가 일반화되어 있기 때문에 `fn difference()`에 대해 *모든* 일반 유형을 명시적으로 명시해야 합니다. 실제로는 입력 `C`에 의해 `A`와 `B`가 결정되는 방식을 표현하는 방법이 필요합니다. 다음 섹션에서 보겠지만, 연관된 유형은 정확히 그러한 기능을 제공합니다.

```rust,editable
struct Container(i32, i32);

// 컨테이너 안에 2개의 항목이 저장되어 있는지 확인하는 trait.
// 또한 첫 번째 또는 마지막 값을 가져옵니다.
trait Contains<A, B> {
    fn contains(&self, _: &A, _: &B) -> bool; // `A`와 `B`를 명시적으로 요구합니다.
    fn first(&self) -> i32; // `A` 또는 `B`를 명시적으로 요구하지 않습니다.
    fn last(&self) -> i32;  // `A` 또는 `B`를 명시적으로 요구하지 않습니다.
}

impl Contains<i32, i32> for Container {
    // 저장된 숫자가 같으면 True.
    fn contains(&self, number_1: &i32, number_2: &i32) -> bool {
        (&self.0 == number_1) && (&self.1 == number_2)
    }

    // 첫 번째 숫자 가져오기.
    fn first(&self) -> i32 { self.0 }

    // 마지막 숫자 가져오기.
    fn last(&self) -> i32 { self.1 }
}

// `C`는 `A`와 `B`를 포함합니다. 그렇기 때문에 `A`와 `B`를 다시 명시하는 것은 번거로움입니다.
fn difference<A, B, C>(container: &C) -> i32 where
    C: Contains<A, B> {
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

    println!("차이값은: {}", difference(&container));
}
```

### 참조

[`struct`s][structs], and [`trait`s][traits]

[structs]: ../../custom_types/structs.md
[traits]: ../../trait.md
