# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-05 06:11
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_remove_answer_question'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='answers_options', to='projects.Question'),
            preserve_default=False,
        ),
    ]