from django.shortcuts import render
from rest_framework import viewsets

from employees.models import Employee, Department
from employees.serializers import EmployeeSerializer, DepartmentSerializer


class EmployeesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    serializer_class = EmployeeSerializer

    def get_queryset(self, *args, **kwargs):
        username = self.request.query_params.get('username', '')
        queryset = Employee.objects.filter(empName__istartswith=username)

        return queryset


class DepartmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows departments to be viewed or edited.
    """
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


def index(request):
    return render(request, 'index.html')
