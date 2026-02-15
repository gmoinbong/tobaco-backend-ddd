
# SQL Analyze — tobacco list query

## Empty table (2 items)

* **Planning Time** : 1.707 ms
* **Execution Time** : 0.130 ms
* **Plan** : Limit → Sort → Seq Scan
* **Seq Scan** : tobacco, Filter `required_experience <= 3`, Rows Removed by Filter: 2

---

## 50k rows

* **Planning Time** : 0.127 ms
* **Execution Time** : 10.783 ms
* **Plan** : Limit → Sort → Seq Scan
* **Seq Scan** : tobacco, Filter `required_experience <= 3`, Actual Rows: 29928, Rows Removed by Filter: 20074
* **Sort** : nicotine_content, top-N heapsort

---

## 100k rows

* **Planning Time** : 0.170 ms
* **Execution Time** : 17.583 ms
* **Plan** : Limit → Gather Merge → Sort → Seq Scan (parallel)
* **Seq Scan** : tobacco, Filter `required_experience <= 3`, Actual Rows: 29978, Rows Removed by Filter: 20024
* **Sort** : nicotine_content, top-N heapsort
* **Workers** : 1
