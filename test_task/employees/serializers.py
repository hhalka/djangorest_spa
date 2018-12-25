from employees.models import Employee, Department
from rest_framework import serializers


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('url', 'id', 'depName')


class EmployeeSerializer(serializers.ModelSerializer):
    depName = serializers.ReadOnlyField(source='empDepId.depName')

    class Meta:
        model = Employee
        fields = ('url', 'id', 'empName', 'empActive', 'empDepId', 'depName')
