from django.db import models

# Create your models here.


class Department(models.Model):
    depName = models.CharField(max_length=32)

    def __str__(self):
        return self.depName


class Employee(models.Model):
    empName = models.CharField(max_length=64)
    empActive = models.BooleanField(default=True)
    empDepId = models.ForeignKey(Department, models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return '{} ({})'.format(self.empName, self.empDepId.depName)
