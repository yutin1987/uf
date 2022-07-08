- Can you explain ACID RDBMS?
  - atomicity

    `Atomicity guarantees that each transaction is treated as a single "unit", which either succeeds completely or fails completely`

  - consistency

    `Consistency ensures that any data written to the database must be valid according to all defined rules. This prevents database corruption by an illegal transaction`

  - isolation

    `Isolation ensures that concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially. (e.g. multiple transactions) `

  - durability

    `Durability guarantees that once a transaction has been committed, it will remain committed even in the case of a system failure. This usually means that completed transactions (or their effects) are recorded in non-volatile memory. (e.g. RAID)`

- Can you explain 3 different (concurrent) read phenomenon? ( transaction1 reads data that transaction2 might have changed)
  - dirty read

  ```
  T1 Q1) SELECT age FROM users WHERE id = 1; // 20
  T2 Q2) UPDATE users SET age = 21 WHERE id = 1;
  T1 Q1) SELECT age FROM users WHERE id = 1; // 21 dirty data
  T2) ROLLBACK;
  ```

  - non-repeatable read

  ```
  T1 Q1) SELECT * FROM users WHERE id = 1; // 20
  T2 Q2) UPDATE users SET age = 21 WHERE id = 1;
  T2 Q2) COMMIT;
  T1 Q1) SELECT * FROM users WHERE id = 1; // 21, it's not 20
  T1 Q1) COMMIT;
  ```

  - phantom read

  ```
  T1 Q1) SELECT * FROM users WHERE age BETWEEN 10 AND 30; // got 3 rows
  T2 Q2) INSERT INTO users(id, name, age) VALUES (3, 'Bob', 27);
  T2 Q2) COMMIT;
  T1 Q1) SELECT * FROM users WHERE age BETWEEN 10 AND 30; // got 4 rows
  T1 Q1) COMMIT;
  ```

- Can you explain the following isolation level on the following transactions?

  - READ COMMITTED

  `(T1) Rollback, v1 = 10, v2 = 10`

  `(T1) Commit, v1 = 10, v2 = 20`

  - READ UNCOMMITTED

  `(T1) Rollback, v1 = 20, v2 = 10`

  `(T1) Commit, v1 = 20, v2 = 20`

  - REPEATABLE READ

  `(T1) Rollback, v1 = 10, v2 = 10`

  `(T1) Commit, v1 = 10, v2 = 10`

- There are two main implementations for isolation. Can you explain that?
  - SX lock (RW lock) - Shared-exclusive LOCK

    `MySQL、MSSQL`

    ```
    Shared (S) locks: It permits a transaction to read a row. If transaction of one session has got this lock no transaction of other session can apply X lock on the same row. We can also say that no transaction of some other session can update that row.

    Exclusive (X) locks: It permits a transaction to update or delete a row. If transaction of one session has got this lock , no transaction of some other session can apply S or X lock on the same row. In a simple way we can say that other session can’t update that row but it can only read that row without asking for any lock.

    1. The same transaction that holds an S lock can promote the lock to an X lock. This is not a conflict.

    2. The SELECT in session 1 with FOR UPDATE acquires an X lock. A simple SELECT query with no locking clause specified does not need to acquire an S lock.

    3. Any UPDATE or DELETE needs to acquire an X lock. That's implicit.
    ```

  - MVCC - Multi-version concurrency control

    `Oracle、PostgreSQL`

    ```
    By allowing multiple versions of the same record, there is going to be less contention on reading/writing records since Readers will not block writers and Writers will not block Readers as well.

    Although not as intuitive as 2PL (Two-Phase Locking), MVCC is not very difficult to understand either. However, it’s very important to understand how it works, especially since data anomalies are treated differently than when locking is being employed.
    ```