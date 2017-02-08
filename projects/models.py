from __future__ import unicode_literals
from django.db import models

class Project(models.Model):
    project_title = models.CharField(max_length=100)
    project_description = models.TextField()
    project_author_name = models.CharField(max_length=100)
    project_version = models.DecimalField(max_digits=4, decimal_places=2)
    user_id=models.IntegerField()

class QuestionSet(models.Model):
    project = models.ForeignKey(Project,  related_name='questionset', on_delete=models.CASCADE)
    questionset_title = models.CharField(max_length=100)
    document = models.FileField(upload_to='documents/')
    comment = models.CharField(max_length=250)

class Question(models.Model):
    questionSet = models.ForeignKey(QuestionSet,  related_name='questions', on_delete=models.CASCADE)
    question_title = models.CharField(max_length=100)

class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers_options', on_delete=models.CASCADE)
    answer = models.CharField(max_length=100)
    check_val=models.BooleanField(default=False)