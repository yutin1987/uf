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
  - read uncommitted

`Dirty Reads: may occur, Non-repeatable Reads: may occur, Lost Updates: may occur, Phantoms: may occur, Write Skews: may occur`

`Read Uncommitted is the lowest isolation level. In this level, one transaction may read not yet committed changes made by other transactions, thereby allowing dirty reads. At this level, transactions are not isolated from each other.`

  - read committed

`Dirty Reads: don't occur, Non-repeatable Reads: may occur, Lost Updates: may occur, Phantoms: may occur, Write Skews: may occur`

`This isolation level guarantees that any data read is committed at the moment it is read. Thus it does not allow dirty read. The transaction holds a read or write lock on the current row, and thus prevents other transactions from reading, updating, or deleting it.`

  - repeatable read

`Dirty Reads: don't occur, Non-repeatable Reads: don't occur, Lost Updates: ?, Phantoms: ?, Write Skews: may occur`

`This is the most restrictive isolation level. The transaction holds read locks on all rows it references and writes locks on referenced rows for update and delete actions. Since other transactions cannot read, update or delete these rows, consequently it avoids non-repeatable read.`

- There are two main implementations for isolation. Can you explain that?
  - SX lock (RW lock)
  - MVCC