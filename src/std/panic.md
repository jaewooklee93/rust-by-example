## `panic!`

`panic!` 마크로는 패닉을 생성하고 스택을 해제하는 데 사용할 수 있습니다. 스택이 해제되는 동안, 런타임은 스레드가 소유한 모든 리소스를 해제하여 모든 객체의 소멸자를 호출합니다.

한 스레드만 있는 프로그램을 다루고 있기 때문에 `panic!`는 프로그램이 패닉 메시지를 보고 종료하게 됩니다.

```rust,editable,ignore,mdbook-runnable
// 정수 나눗셈 (/ )의 재구현
fn division(dividend: i32, divisor: i32) -> i32 {
    if divisor == 0 {
        // 0으로 나누는 것은 패닉을 유발합니다
        panic!("0으로 나누기");
    } else {
        dividend / divisor
    }
}

// `main` 작업
fn main() {
    // 힙에 할당된 정수
    let _x = Box::new(0i32);

    // 이 작업은 작업 실패를 유발합니다
    division(3, 0);

    println!("이 부분은 실행되지 않습니다!");

    // `_x`는 이 지점에서 소멸되어야 합니다
}
```

`panic!`이 메모리 누수를 일으키지 않는지 확인해 보겠습니다.

<!-- REUSE-IgnoreStart -->
<!-- REUSE가 샘플 코드의 저작권 표시를 분석하는 것을 방지합니다 -->
```shell
$ rustc panic.rs && valgrind ./panic
==4401== Memcheck, a memory error detector
==4401== Copyright (C) 2002-2013, and GNU GPL'd, by Julian Seward et al.
==4401== Using Valgrind-3.10.0.SVN and LibVEX; rerun with -h for copyright info
==4401== Command: ./panic
==4401== 
thread '<main>' panicked at '0으로 나누기', panic.rs:5
==4401== 
==4401== HEAP SUMMARY:
==4401==     in use at exit: 0 bytes in 0 blocks
==4401==   total heap usage: 18 allocs, 18 frees, 1,648 bytes allocated
==4401== 
==4401== All heap blocks were freed -- no leaks are possible
==4401== 
==4401== For counts of detected and suppressed errors, rerun with: -v
==4401== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
<!-- REUSE-IgnoreEnd -->
