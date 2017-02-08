from django.contrib import admin
from .models import Project, QuestionSet,Question, Answer

admin.site.register(Project)
admin.site.register(QuestionSet)
admin.site.register(Question)
admin.site.register(Answer)