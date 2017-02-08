from rest_framework import serializers
from .models import Project,Answer,Question,QuestionSet
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    projects = serializers.PrimaryKeyRelatedField(many=True, queryset=Project.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'projects')
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'answer','check_val')
class QuestionSerializer(serializers.ModelSerializer):
    answers_options = AnswerSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ('id','question_title','answers_options')

class QuestionSetSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = QuestionSet
        fields = ('id','questionset_title','comment','questions')

class ProjectSerializer(serializers.ModelSerializer):
    questionset = QuestionSetSerializer(many=True,read_only=True)
    class Meta:
        model = Project
        fields = ('id','project_title', 'project_description', 'project_author_name', 'project_version','user_id','questionset')




