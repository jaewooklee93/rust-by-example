## `Rc`

여러 소유권이 필요한 경우 `Rc`(참조 카운트)를 사용할 수 있습니다. `Rc`는 내부에 감싸진 값의 소유자 수를 추적하는 역할을 합니다. 

`Rc`의 참조 카운트는 `Rc`가 복사될 때마다 1 증가하고, 복사된 `Rc`가 스코프 밖으로 제거될 때마다 1 감소합니다. `Rc`의 참조 카운트가 0이 되면(즉, 더 이상 소유자가 없을 때) `Rc`와 내부 값 모두 해제됩니다. 

`Rc`를 복사하는 것은 항상 깊은 복사를 수행하지 않습니다. 복사는 내부 값에 대한 또 다른 포인터를 생성하고 카운트를 증가시킵니다.

```rust,editable
use std::rc::Rc;

fn main() {
    let rc_examples = "Rc examples".to_string();
    {
        println!("--- rc_a가 생성됨 ---");
        
        let rc_a: Rc<String> = Rc::new(rc_examples);
        println!("rc_a의 참조 카운트: {}", Rc::strong_count(&rc_a));
        
        {
            println!("--- rc_a가 rc_b로 복사됨 ---");
            
            let rc_b: Rc<String> = Rc::clone(&rc_a);
            println!("rc_b의 참조 카운트: {}", Rc::strong_count(&rc_b));
            println!("rc_a의 참조 카운트: {}", Rc::strong_count(&rc_a));
            
            // 두 `Rc`는 내부 값이 같으면 같다고 간주됩니다
            println!("rc_a와 rc_b가 같음: {}", rc_a.eq(&rc_b));
            
            // `Rc` 내부 값의 메서드를 직접 사용할 수 있습니다
            println!("rc_a 내부 값의 길이: {}", rc_a.len());
            println!("rc_b의 값: {}", rc_b);
            
            println!("--- rc_b가 스코프 밖으로 제거됨 ---");
        }
        
        println!("rc_a의 참조 카운트: {}", Rc::strong_count(&rc_a));
        
        println!("--- rc_a가 스코프 밖으로 제거됨 ---");
    }
    
    // 오류! `rc_examples`는 이미 `rc_a`로 이동되었습니다
    // 그리고 `rc_a`가 해제될 때 `rc_examples`도 함께 해제됩니다
    // println!("rc_examples: {}", rc_examples);
    // TODO ^ 이 줄을 주석 해제해 보세요
}
```

### 참조:

[std::rc][1] 및 [std::sync::arc][2].

[1]: https://doc.rust-lang.org/std/rc/index.html
[2]: https://doc.rust-lang.org/std/sync/struct.Arc.html
