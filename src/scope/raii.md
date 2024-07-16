## RAII

Rust에서 변수는 단순히 데이터를 저장하는 것 이상의 역할을 합니다. 변수는 *소유권*을 가지며, 예를 들어 `Box<T>`는 힙에 있는 메모리를 소유합니다. Rust는 [RAII](https://en.wikipedia.org/wiki/Resource_Acquisition_Is_Initialization) (자원획득은 초기화)를 강제하기 때문에, 객체의 범위가 끝날 때마다 소멸자(destructor)가 호출되어 소유한 자원이 해제됩니다.

이러한 동작은 *자원 누수* 오류로부터 보호하여, 메모리 해제를 수동으로 처리하거나 메모리 누수에 대해 걱정할 필요가 없습니다! 간단한 예시를 살펴보겠습니다:

```rust,editable
// raii.rs
fn create_box() {
    // 힙에 정수를 할당
    let _box1 = Box::new(3i32);

    // `_box1`이 여기서 소멸되고 메모리가 해제됩니다
}

fn main() {
    // 힙에 정수를 할당
    let _box2 = Box::new(5i32);

    // 중첩된 범위:
    {
        // 힙에 정수를 할당
        let _box3 = Box::new(4i32);

        // `_box3`이 여기서 소멸되고 메모리가 해제됩니다
    }

    // 재밌게 많은 Box를 생성
    // 메모리를 수동으로 해제할 필요가 없습니다!
    for _ in 0u32..1_000 {
        create_box();
    }

    // `_box2`이 여기서 소멸되고 메모리가 해제됩니다
}
```

물론, [`valgrind`](http://valgrind.org/info/)를 사용하여 메모리 오류를 확인할 수 있습니다:

<!-- REUSE-IgnoreStart -->
<!-- REUSE가 샘플 코드의 저작권 표시를 분석하는 것을 방지 -->
```shell
$ rustc raii.rs && valgrind ./raii
==26873== Memcheck, a memory error detector
==26873== Copyright (C) 2002-2013, and GNU GPL'd, by Julian Seward et al.
==26873== Using Valgrind-3.9.0 and LibVEX; rerun with -h for copyright info
==26873== Command: ./raii
==26873==
==26873==
==26873== HEAP SUMMARY:
==26873==     in use at exit: 0 bytes in 0 blocks
==26873==   total heap usage: 1,013 allocs, 1,013 frees, 8,696 bytes allocated
==26873==
==26873== All heap blocks were freed -- no leaks are possible
==26873==
==26873== For counts of detected and suppressed errors, rerun with: -v
==26873== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 2 from 2)
```
<!-- REUSE-IgnoreEnd -->

누수 없음!

## 소멸자

Rust에서 소멸자의 개념은 [`Drop`] 트레이트를 통해 제공됩니다. 소멸자는 자원이 범위를 벗어날 때 호출됩니다. 이 트레이트는 모든 유형에 대해 구현되어 있는 것은 아니며, 자신의 소멸자 논리를 필요로 하는 경우에만 유형에 구현해야 합니다.

아래 예제를 실행하면 [`Drop`] 트레이트가 어떻게 작동하는지 확인할 수 있습니다. `main` 함수의 변수가 범위를 벗어날 때 사용자 정의 소멸자가 호출됩니다.

```rust,editable
struct ToDrop;

impl Drop for ToDrop {
    fn drop(&mut self) {
        println!("ToDrop is being dropped");
    }
}

fn main() {
    let x = ToDrop;
    println!("Made a ToDrop!");
}
```

### 참조

[Box](../std/box.md)

[raii]: https://en.wikipedia.org/wiki/Resource_Acquisition_Is_Initialization
[box]: ../std/box.md
[valgrind]: http://valgrind.org/info/
[`Drop`]: https://doc.rust-lang.org/std/ops/trait.Drop.html
