# Generated by Django 4.1.5 on 2023-02-07 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_remove_user_confirm_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre_name', models.CharField(max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=50),
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('movie_id', models.AutoField(primary_key=True, serialize=False)),
                ('movie_title', models.CharField(max_length=50)),
                ('movie_summary', models.CharField(max_length=200)),
                ('movie_rating', models.IntegerField()),
                ('movie_release_date', models.DateField()),
                ('movie_genres', models.ManyToManyField(to='backend.genre')),
            ],
        ),
    ]
