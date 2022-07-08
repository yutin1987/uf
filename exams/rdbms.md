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
T1 Q1) SELECT age FROM users WHERE id = 1; // 21
T2) ROLLBACK; /* lock-based DIRTY READ */
```

  - non-repeatable read

```
T1 Q1) SELECT * FROM users WHERE id = 1;
T2 Q2) UPDATE users SET age = 21 WHERE id = 1;
T2 Q2) COMMIT;
T1 Q1) SELECT * FROM users WHERE id = 1; /**
T1 Q1) COMMIT;
```

  - phantom read

```
T1 Q1) SELECT * FROM users WHERE age BETWEEN 10 AND 30;
T2 Q2) INSERT INTO users(id, name, age) VALUES (3, 'Bob', 27);
T2 Q2) COMMIT;
T1 Q1) SELECT * FROM users WHERE age BETWEEN 10 AND 30; /**
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

  - MVCC - Multi-version concurrency control

    `Oracle、PostgreSQL`