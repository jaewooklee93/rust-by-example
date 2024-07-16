## `dyn`을 사용하여 Trait 반환하기

Rust 컴파일러는 각 함수의 반환 유형이 얼마나 많은 공간을 차지하는지 알아야 합니다. 이는 모든 함수가 구체적인 유형을 반환해야 함을 의미합니다. 다른 언어와 달리 `Animal`와 같은 Trait가 있다면 `Animal`을 반환하는 함수를 작성할 수 없습니다. 왜냐하면 그 다양한 구현은 다른 양의 메모리를 필요로 하기 때문입니다.

그러나 쉽게 해결할 수 있습니다. Trait 객체를 직접 반환하는 대신, 함수는 `Box`를 반환합니다. `Box`는 _내부에_ 어떤 `Animal`을 _포함_합니다. `box`는 단순히 힙 메모리에 있는 메모리에 대한 참조입니다. 참조는 정적 크기를 가지고 있으며, 컴파일러는 `Animal`을 힙에 할당된 것으로 보장할 수 있기 때문에 함수에서 Trait를 반환할 수 있습니다!

Rust는 힙 메모리에 할당할 때마다 가능한 한 명확하게 표현하려고 합니다. 따라서 함수가 이런 방식으로 힙에 있는 Trait 포인터를 반환하는 경우, 반환 유형을 `dyn` 키워드로 작성해야 합니다. 예를 들어 `Box<dyn Animal>`입니다.

```rust,editable
struct Sheep {}
struct Cow {}

trait Animal {
    // 인스턴스 메서드 서명
    fn noise(&self) -> &'static str;
}

// `Sheep`에 대해 `Animal` Trait 구현.
impl Animal for Sheep {
    fn noise(&self) -> &'static str {
        "baaaaah!"
    }
}

// `Cow`에 대해 `Animal` Trait 구현.
impl Animal for Cow {
    fn noise(&self) -> &'static str {
        "moooooo!"
    }
}

// 컴파일 시간에 어떤 것이 있는지 알 수 없지만 `Animal`을 구현하는 어떤 구조를 반환합니다.
fn random_animal(random_number: f64) -> Box<dyn Animal> {
    if random_number < 0.5 {
        Box::new(Sheep {})
    } else {
        Box::new(Cow {})
    }
}

fn main() {
    let random_number = 0.234;
    let animal = random_animal(random_number);
    println!("You've randomly chosen an animal, and it says {}", animal.noise());
}

```
