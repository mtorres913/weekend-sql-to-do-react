CREATE TABLE "todo" (
	"id" serial PRIMARY KEY,
	"task" varchar(80) NOT NULL,
	"completed" varchar(20) DEFAULT 'No'
);


INSERT INTO "todo" (task)
VALUES ('Make breakfast'),
('Finish homework'),
('Workout at gym');