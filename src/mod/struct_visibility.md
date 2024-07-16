## 구조체 가시성

구조체는 필드의 추가적인 가시성 레벨을 가지고 있습니다. 가시성은 기본적으로 개방되지 않으며, `pub` 수정자로 재정의할 수 있습니다. 이 가시성은 구조체가 정의된 모듈 외부에서 액세스될 때만 중요하며, 정보를 숨기는 목적(캡슐화)을 가지고 있습니다.

```rust,editable
mod my {
    // 일반적인 유형 `T`를 가진 공개 구조체와 공개 필드
    pub struct OpenBox<T> {
        pub contents: T,
    }

    // 일반적인 유형 `T`를 가진 공개 구조체와 개방되지 않은 필드
    pub struct ClosedBox<T> {
        contents: T,
    }

    impl<T> ClosedBox<T> {
        // 공개 생성자 메서드
        pub fn new(contents: T) -> ClosedBox<T> {
            ClosedBox {
                contents: contents,
            }
        }
    }
}

fn main() {
    // 공개 필드를 가진 공개 구조체는 일반적으로 생성할 수 있습니다
    let open_box = my::OpenBox { contents: "공개 정보